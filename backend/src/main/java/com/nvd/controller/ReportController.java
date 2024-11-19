package com.nvd.controller;

import com.google.common.net.HttpHeaders;
import com.nvd.dto.request.report.PostReportDTO;
import com.nvd.dto.request.report.UserRepostDTO;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.models.PostReported;
import com.nvd.models.UserReported;
import com.nvd.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ReportController {

    private final TokenService tokenService;
    private final UserService userService;
    private final PostService postService;
    private final UserReportedService userReportedService;
    private final PostReportedService postReportedService;

    @PostMapping("/user")
    public ResponseEntity<String> reportUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                             @RequestBody UserRepostDTO body) {
        String loggedInUser = tokenService.getUsernameFromToken(token);
        ApplicationUser user = userService.getUserByUsername(loggedInUser);
        ApplicationUser reportedUser = userService.getUserById(body.getToUserId());
        String result;

        if (!userReportedService.checkExistReport(reportedUser, user)) {
            UserReported reported = new UserReported();
            reported.setReportedUser(reportedUser);
            reported.setUserSendReport(user);
            reported.setContentReport(body.getContent());
            userReportedService.saveReport(reported);
            result = "User reported successfully!";
        } else {
            result = "You have already reported this user.";
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/post")
    public ResponseEntity<String> reportPost(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                             @RequestBody PostReportDTO body) {
        String loggedInUser = tokenService.getUsernameFromToken(token);
        ApplicationUser user = userService.getUserByUsername(loggedInUser);
        Post post = postService.getPostEntityById(body.getPostId());
        String result;

        if (!postReportedService.checkExistReport(post, user)) {
            PostReported reported = new PostReported();
            reported.setReportedPost(post);
            reported.setUserSendReport(user);
            reported.setContentReport(body.getContent());
            postReportedService.saveReport(reported);
            result = "Post reported successfully!";
        } else
            result = "You have already reported this post.";

        return ResponseEntity.ok(result);
    }
}
