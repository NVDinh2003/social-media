package com.nvd.service.gg;

import com.nvd.dto.oauth.ExchangeTokenRequest;
import com.nvd.dto.oauth.ExchangeTokenResponse;
import com.nvd.dto.oauth.UserInfoResponse;
import com.nvd.models.ApplicationUser;
import com.nvd.models.LoginResponse;
import com.nvd.repositories.RoleRepository;
import com.nvd.repositories.UserRepository;
import com.nvd.repositories.gg.GoogleUserInfoClient;
import com.nvd.repositories.gg.OutboundIdentityClient;
import com.nvd.service.TokenService;
import com.nvd.service.UserService;
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
    UserService userService;
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

    public LoginResponse outboundAuthenticate(String code) {
        if (code == null || code.isEmpty()) {
            throw new IllegalArgumentException("Authorization code is required");
        }

        ExchangeTokenResponse response = outboundIdentityClient.exchangeToken(ExchangeTokenRequest.builder()
                .code(code)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_SECRET)
                .redirectUri(REDIRECT_URI)
                .grantType(GRANT_TYPE)
                .build());

        log.info("RAW TOKEN RESPONSE: {}", response);

        // Lấy thông tin người dùng qua Google UserInfo API
        UserInfoResponse userInfo = googleUserInfoClient.getUserInfo(response.getAccessToken());

        log.info("USER INFO RESPONSE {}", userInfo);

        ApplicationUser user = userService.getOrCreateGoogleUser(userInfo);

        // Tạo token mà không cần xác thực mật khẩu
        var authorities = user.getAuthorities().stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toList());

        String token = tokenService.generateToken(
                new UsernamePasswordAuthenticationToken(user.getUsername(), null, authorities));

        // Trả về LoginResponse chứa người dùng và token
        return LoginResponse.builder()
                .token(token)
                .user(user)
                .build();
    }

}