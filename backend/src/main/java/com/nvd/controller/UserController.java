package com.nvd.controller;

import com.google.common.net.HttpHeaders;
import com.nvd.exceptions.UnableToSavePhotoException;
import com.nvd.models.ApplicationUser;
import com.nvd.service.ImageService;
import com.nvd.service.TokenService;
import com.nvd.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;
    private final ImageService imageService;

    @GetMapping("/verify")
    public ApplicationUser verifyIdentity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String username = "";
        ApplicationUser user;

        if (token.startsWith("Bearer")) {  // or token.substring(0, 6).equals("Bearer")
            String strippedToken = token.substring(7);
            username = tokenService.getUsernameFromToken(strippedToken);
        }

        try {
            user = userService.getUserByUsername(username);
        } catch (Exception e) {
            user = null;
        }
        return user;
    }

    @PostMapping("/pfp") // profile picture
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("image") MultipartFile file) throws UnableToSavePhotoException {

        String uploadImage = imageService.uploadImage(file, "pfp");

        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
    }
}
