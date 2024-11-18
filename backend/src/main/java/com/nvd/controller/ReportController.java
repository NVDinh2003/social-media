package com.nvd.controller;

import com.google.common.net.HttpHeaders;
import com.nvd.service.PostReportedService;
import com.nvd.service.TokenService;
import com.nvd.service.UserReportedService;
import com.nvd.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final UserReportedService userReportedService;
    private final PostReportedService postReportedService;

    @PostMapping("/user")
    public ResponseEntity<Void> reportUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                           @RequestParam("to") Integer toUserId,
                                           @RequestParam("content") String content) {
//        String loggedInUser = tokenService.getUsernameFromToken(token);
//        ApplicationUser user = userService.getUserByUsername(loggedInUser);
//        UserReported reported = new UserReported();
//        reported.set(toUserId);
//        reported.setUser_send_report_id(user.getUser_id() + "");
//        reported.setContent_report(content);
//        reported.setDate_report(new Date());
//        if (moderatorUserReportedService.checkExistReport(to, user.getUser_id() + "") == false) {
//            moderatorUserReportedService.insert(reported);
//        }
//        return null;
    }

    @PostMapping("/post")
    public ResponseEntity<Void> reportPost(HttpServletRequest request, @RequestParam("postId") String postId, @RequestParam("content") String content) {
//        String email = jwtTokenUtil.getEmailFromHeader(request);
//        User user = userService.findByEmail(email);
//        ModeratorPostReported reported = new ModeratorPostReported();
//        reported.setPost_reported_id(postId);
//        reported.setUser_send_report_id(user.getUser_id() + "");
//        reported.setContent_report(content);
//        reported.setDate_report(new Date());
//        if (moderatorPostReportedService.checkExistReport(postId, user.getUser_id() + "") == false) {
//            moderatorPostReportedService.insert(reported);
//        }
//        return null;
    }
}
