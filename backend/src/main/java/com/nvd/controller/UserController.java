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

import java.util.Map;
import java.util.Set;


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

    @PostMapping("/banner") // banner picture
    public ApplicationUser uploadBannerPicture(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam("image") MultipartFile file)
            throws UnableToSavePhotoException {
        String username = tokenService.getUsernameFromToken(token);
        return userService.setProfileOrBannerPicture(username, file, "bnr");
    }

    @PutMapping("/")
    public ApplicationUser updateUser(
            @RequestBody ApplicationUser user) {
        return userService.update(user);
    }

    @PutMapping("follow")
    public Set<ApplicationUser> followUsers(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody Map<String, String> body) {
        String loggedInUser = tokenService.getUsernameFromToken(token);
        String followedUser = body.get("followedUser");
        return userService.followUser(loggedInUser, followedUser);
    }


    @GetMapping("/following/{username}")
    public Set<ApplicationUser> getFollowingList(@PathVariable String username) {
        return userService.retrieveFollowingList(username);
    }

    @GetMapping("/followers/{username}")
    public Set<ApplicationUser> getFollowersList(@PathVariable String username) {
        return userService.retrieveFollowersList(username);
    }
}
