package com.nvd.controller.admin;

import com.nvd.exceptions.EmailFaildToSendException;
import com.nvd.models.ApplicationUser;
import com.nvd.service.MailService;
import com.nvd.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@RolesAllowed("ADMIN")
public class AdminController {
    private final UserService userService;
    private final MailService mailService;

    @GetMapping("/ban-user/{username}")
    public void adminBanUser(@PathVariable String username) {
        try {
            ApplicationUser user = userService.getUserByUsername(username);
            userService.disable(user);
            sendNotification(user);
        } catch (Exception e) {
            System.out.println("Error at admin/actionOnUser: " + e);
        }
    }

    private void sendNotification(ApplicationUser user) {
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
