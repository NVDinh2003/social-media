package com.nvd.controller;

import com.nvd.dto.FindUsernameDTO;
import com.nvd.dto.PasswordCodeDTO;
import com.nvd.exceptions.EmailAlreadyTakenException;
import com.nvd.exceptions.EmailFaildToSendException;
import com.nvd.exceptions.IncorrectVerificationCodeException;
import com.nvd.exceptions.UserDoesNotExistException;
import com.nvd.models.ApplicationUser;
import com.nvd.models.LoginResponse;
import com.nvd.models.RegistrationObject;
import com.nvd.service.MailService;
import com.nvd.service.TokenService;
import com.nvd.service.UserService;
import com.nvd.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailTaken() {
        return new ResponseEntity<>("The email you provided is already in use", HttpStatus.CONFLICT);
    }

    @PostMapping("/register")
    public ApplicationUser register(@RequestBody RegistrationObject ro) {
        return userService.registerUser(ro);
    }

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesntExist() {
        return new ResponseEntity<>(Constants.USER_DOES_NOT_EXIST_EXC, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/phone")
    public ApplicationUser updatePhoneNumber(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String phone = body.get("phone");

        ApplicationUser user = userService.getUserByUsername(username);
        user.setPhone(phone);
        return userService.update(user);
    }

    @ExceptionHandler({EmailFaildToSendException.class})
    public ResponseEntity<String> handleFaildEmail() {
        return new ResponseEntity<>(Constants.EMAIL_FAILED_TO_SEND_EXC, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/email/code")
    public ResponseEntity<String> createEmailVerification(@RequestBody LinkedHashMap<String, String> body) {
        userService.generateEmailVerification(body.get("username"));
        return new ResponseEntity<>("Verification code generated, email sent!", HttpStatus.OK);
    }

    @ExceptionHandler({IncorrectVerificationCodeException.class})
    public ResponseEntity<String> incorrectCodeHandler() {
        return new ResponseEntity<>(Constants.INCORRECT_VERIFICATION_CODE_EXC, HttpStatus.CONFLICT);
    }

    @PostMapping("/email/verify")
    public ApplicationUser verifyEmail(@RequestBody Map<String, String> body) {
        Long code = Long.parseLong(body.get("code"));
        String username = body.get("username");
        return userService.verifyEmail(username, code);
    }

    @PutMapping("/update/password")
    public ApplicationUser updatePassword(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        return userService.setPassword(username, password);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody Map<String, String> body) throws InvalidCredentialsException {

        String username = body.get("username");
        String password = body.get("password");

        try {
            Authentication auth = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(username, password));
            String token = tokenService.generateToken(auth);
            return new LoginResponse(userService.getUserByUsername(username), token);
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException();
        }
    }

    @ExceptionHandler({InvalidCredentialsException.class})
    public ResponseEntity<String> handleInvalidCreadential() {
        return new ResponseEntity<>("Invalid credentials", HttpStatus.FORBIDDEN);
    }

    @PostMapping("/find")
    public ResponseEntity<String> verifyUsername(@RequestBody FindUsernameDTO credential) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);  // response một chuỗi văn bản thuần (plain text).
        String username = userService.verifyUsername(credential);
        return new ResponseEntity<>(username, HttpStatus.OK);
    }

    @PostMapping("/identifiers")
    public FindUsernameDTO getIdentifiers(@RequestBody FindUsernameDTO credential) {
        ApplicationUser user = userService.getUsersEmailAndPhone(credential);
        return new FindUsernameDTO(user.getEmail(), user.getPhone(), user.getUsername());
    }

    @PostMapping("/password/code")
    public ResponseEntity<String> retrievePasswordCode(@RequestBody PasswordCodeDTO body)
            throws EmailFaildToSendException {
        String email = body.getEmail();
        int code = body.getCode();
        mailService.sendMail(email, "Your password reset code", "Here is your password reset code: " + code);
        return new ResponseEntity<>("Code sent to email", HttpStatus.OK);
    }

}
