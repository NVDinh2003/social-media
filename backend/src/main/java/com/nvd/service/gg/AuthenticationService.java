package com.nvd.service.gg;

import com.nvd.dto.oauth.AuthenticationResponse;
import com.nvd.dto.oauth.ExchangeTokenRequest;
import com.nvd.dto.oauth.ExchangeTokenResponse;
import com.nvd.dto.oauth.UserInfoResponse;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Role;
import com.nvd.repositories.RoleRepository;
import com.nvd.repositories.UserRepository;
import com.nvd.repositories.gg.GoogleUserInfoClient;
import com.nvd.repositories.gg.OutboundIdentityClient;
import com.nvd.service.TokenService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    OutboundIdentityClient outboundIdentityClient;
    GoogleUserInfoClient googleUserInfoClient;
    UserRepository userRepository;
    TokenService tokenService;
    RoleRepository roleRepository;

    @NonFinal
    @Value("${outbound.identity.client-id}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${outbound.identity.client-secret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${outbound.identity.redirect-uri}")
    protected String REDIRECT_URI;

    @NonFinal
    protected final String GRANT_TYPE = "authorization_code";

    public AuthenticationResponse outboundAuthenticate(String code) {
        ExchangeTokenRequest exchangeTokenRequest = ExchangeTokenRequest.builder()
                .code(code)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_SECRET)
                .redirectUri(REDIRECT_URI)
                .grantType(GRANT_TYPE)
                .build();
        ExchangeTokenResponse response = outboundIdentityClient.exchangeToken(exchangeTokenRequest);

        log.info("RAW GOOGLE TOKEN RESPONSE: {}", response);

        // Bước 2: Lấy thông tin người dùng qua API Google UserInfo
        UserInfoResponse userInfo = googleUserInfoClient.getUserInfo(response.getAccessToken());

        log.info("USER INFO RESPONSE {}", userInfo);

        String email = userInfo.getEmail();
        String name = userInfo.getName();


        ApplicationUser user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            ApplicationUser newUser = new ApplicationUser();
            newUser.setEmail(email);
            newUser.setUsername(email);
            newUser.setFirstName(name);

            // Gán role cho người dùng mới
            Role userRole = roleRepository.findByAuthority("USER").orElseThrow(() -> new RuntimeException("Role not found"));
            newUser.getAuthorities().add(userRole);

            user = userRepository.save(newUser);
        }

        // Chuyển đổi Set<Role> thành Collection<? extends GrantedAuthority>
        var authorities = user.getAuthorities().stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toList());

        // Tạo token mà không cần xác thực mật khẩu
        String token = tokenService.generateToken(new UsernamePasswordAuthenticationToken(user.getUsername(), null, authorities));
        String t = response.getAccessToken();
        return AuthenticationResponse.builder().token(response.getAccessToken()).build();
    }


//    public AuthenticationResponse outboundAuthenticate(String code) {
//        var response = outboundIdentityClient.exchangeToken(ExchangeTokenRequest.builder()
//                .code(code)
//                .clientId(CLIENT_ID)
//                .clientSecret(CLIENT_SECRET)
//                .redirectUri(REDIRECT_URI)
//                .grantType(GRANT_TYPE)
//                .build());
//
//        log.info("TOKEN RESPONSE {}", response);
//
//        return AuthenticationResponse.builder().token(response.getAccessToken()).build();
//    }
}