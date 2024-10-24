package com.nvd.controller;

import com.google.common.net.HttpHeaders;
import com.nvd.exceptions.UnableToResolvePhotoException;
import com.nvd.exceptions.UnableToSavePhotoException;
import com.nvd.models.ApplicationUser;
import com.nvd.service.NotificationService;
import com.nvd.service.TokenService;
import com.nvd.service.UserService;
import com.nvd.utils.SpamRrequestCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Set;


@RestController
@RequestMapping("/users")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;
    private final NotificationService notificationService;

    @SpamRrequestCheck // Áp dụng kiểm tra Redis trước khi xử lý method này
    @GetMapping("/{username}")
    public ApplicationUser getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }


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

    @PostMapping("/organization")
    public ResponseEntity<byte[]> setUserOrganization(@RequestPart("username") String username,
                                                      @RequestPart("file") MultipartFile file,
                                                      @RequestPart("organization") String organization)
            throws UnableToResolvePhotoException {
        byte[] org = userService.setUserOrganization(username, file, organization);
        return ResponseEntity.ok(org);
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

        ApplicationUser user = userService.followUser(loggedInUser, followedUser);
        ApplicationUser followed = user.getFollowing().stream()
                .filter(u -> u.getUsername().equals(followedUser)).findFirst().orElse(null);

        notificationService.createAndSendFollowNotifications(followed, user);
        return user.getFollowing();
    }

    @PutMapping("test-follow")
    public ApplicationUser testFollowUsers(
            @RequestBody Map<String, String> body) {
        String user1 = body.get("user1");
        String followToUser = body.get("followToUser");
        return userService.testFollowUser(user1, followToUser);
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
