package com.nvd.controller;

import com.google.common.net.HttpHeaders;
import com.nvd.exceptions.UnableToSavePhotoException;
import com.nvd.models.ApplicationUser;
import com.nvd.service.ImageService;
import com.nvd.service.TokenService;
import com.nvd.service.UserService;
import lombok.RequiredArgsConstructor;
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
        String username = tokenService.getUsernameFromToken(token);
        return userService.getUserByUsername(username);
    }

    @PostMapping("/pfp") // profile picture
    public ApplicationUser uploadProfilePicture(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam("image") MultipartFile file)
            throws UnableToSavePhotoException {
        String username = tokenService.getUsernameFromToken(token);
        return userService.setProfileOrBannerPicture(username, file, "pfp");
    }

    @PostMapping("/banner") // profile picture
    public ApplicationUser uploadBannerPicture(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam("image") MultipartFile file)
            throws UnableToSavePhotoException {
        String username = tokenService.getUsernameFromToken(token);
        return userService.setProfileOrBannerPicture(username, file, "bnr");
    }
}
