package com.nvd.controller;

import com.google.common.net.HttpHeaders;
import com.nvd.dto.request.UserUpdateDTO;
import com.nvd.exceptions.UnableToResolvePhotoException;
import com.nvd.exceptions.UnableToSavePhotoException;
import com.nvd.models.ApplicationUser;
import com.nvd.service.NotificationService;
import com.nvd.service.TokenService;
import com.nvd.service.UserService;
import com.nvd.utils.SpamRequestCheck;
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

    @SpamRequestCheck // Áp dụng kiểm tra Redis trước khi xử lý method này
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

    @PutMapping("/update")
    public ResponseEntity<ApplicationUser> updateUser(@RequestBody UserUpdateDTO userUpdateDTO, @RequestHeader("Authorization") String token) {
        String loggedInUsername = tokenService.getUsernameFromToken(token);
        ApplicationUser updatedUser = userService.updateUser(userUpdateDTO, loggedInUsername);
        return ResponseEntity.ok(updatedUser);
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

        if (followed != null) {
            notificationService.createAndSendFollowNotifications(followed, user);
        }
        return user.getFollowing();
    }

    @PutMapping("test-follow")
    public Set<ApplicationUser> testFollowUsers(
            @RequestBody Map<String, String> body) {
        String user1 = body.get("user");
        String followToUser = body.get("followToUser");
        ApplicationUser user = userService.testFollowUser(user1, followToUser);
        ApplicationUser followed = user.getFollowing().stream()
                .filter(u -> u.getUsername().equals(followToUser)).findFirst().orElse(null);

        notificationService.createAndSendFollowNotifications(followed, user);
        return user.getFollowing();
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
