package com.nvd.controller;

import com.nvd.exceptions.EmailAlreadyTakenException;
import com.nvd.exceptions.EmailFaildToSendException;
import com.nvd.exceptions.IncorrectVerificationCodeException;
import com.nvd.exceptions.UserDoesNotExistException;
import com.nvd.models.ApplicationUser;
import com.nvd.models.LoginResponse;
import com.nvd.models.RegistrationObject;
import com.nvd.service.TokenService;
import com.nvd.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailTaken() {
        return new ResponseEntity<String>("The email you provided is already in use", HttpStatus.CONFLICT);
    }

    @PostMapping("/register")
    public ApplicationUser register(@RequestBody RegistrationObject ro) {
        return userService.registerUser(ro);
    }

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesntExist() {
        return new ResponseEntity<String>("The user you are looking for does not exist!", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/phone")
    public ApplicationUser updatePhoneNumber(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        String phone = body.get("phone");

        ApplicationUser user = userService.getUserByUsername(username);
        user.setPhone(phone);
        return userService.update(user);
    }

    @ExceptionHandler({EmailFaildToSendException.class})
    public ResponseEntity<String> handleFaildEmail() {
        return new ResponseEntity<String>("Email failed to send, try again in a moment!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/email/code")
    public ResponseEntity<String> createEmailVerification(@RequestBody LinkedHashMap<String, String> body) {
        userService.generateEmailVerification(body.get("username"));
        return new ResponseEntity<String>("Verification code generated, email sent!", HttpStatus.OK);
    }

    @ExceptionHandler({IncorrectVerificationCodeException.class})
    public ResponseEntity<String> incorrectCodeHandler() {
        return new ResponseEntity<String>("The verification code provided is incorrect! ", HttpStatus.CONFLICT);
    }

    @PostMapping("/email/verify")
    public ApplicationUser verifyEmail(@RequestBody LinkedHashMap<String, String> body) {
        Long code = Long.parseLong(body.get("code"));
        String username = body.get("username");
        return userService.verifyEmail(username, code);
    }

    @PostMapping("/update/password")
    public ApplicationUser updatePassword(@RequestBody LinkedHashMap<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        return userService.setPassword(username, password);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LinkedHashMap<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        try {
            Authentication auth = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(username, password));
            String token = tokenService.generateToken(auth);
            return new LoginResponse(userService.getUserByUsername(username), token);
        } catch (AuthenticationException e) {
            return new LoginResponse(null, "");
        }
    }
}
