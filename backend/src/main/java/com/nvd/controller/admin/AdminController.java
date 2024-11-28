package com.nvd.controller.admin;

import com.nvd.exceptions.EmailFaildToSendException;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.service.MailService;
import com.nvd.service.PostService;
import com.nvd.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@RolesAllowed("ADMIN")
public class AdminController {
    private final UserService userService;
    private final PostService postService;
    private final MailService mailService;

    @PutMapping("/action-on-user/{username}")
    public void adminBanUser(@PathVariable String username) {
        try {
            ApplicationUser user = userService.getUserByUsername(username);
            userService.disable(user);
            sendMailToUser(user);
        } catch (Exception e) {
            System.out.println("Error at admin/actionOnUser: " + e);
        }
    }

    @PutMapping("/action-on-post/{postId}")
    public void adminGetActionPost(@PathVariable int postId) {
        try {
            Post post = postService.getPostEntityById(postId);
            postService.disable(post);
        } catch (Exception e) {
            System.out.println("Error at admin/actionOnPost: " + e);
        }
    }

    private void sendMailToUser(ApplicationUser user) {
        String subject = Boolean.TRUE.equals(user.getEnabled()) ? "You have been banned!" : "You have been unbanned!";
        String message = Boolean.TRUE.equals(user.getEnabled()) ?
                "We are sorry to inform you that you have been banned from our website" :
                "We are happy to inform you that you have been unbanned from our website";
        try {
            mailService.sendMail(user.getEmail(), subject, message);
        } catch (Exception e) {
            throw new EmailFaildToSendException();
        }
    }

}
