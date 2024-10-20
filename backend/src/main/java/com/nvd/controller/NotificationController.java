package com.nvd.controller;

import com.nvd.dto.request.AcknowledgeNotificationsDTO;
import com.nvd.models.Notification;
import com.nvd.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<Notification> fetchUsersNotifications(@PathVariable("userId") Integer userId) {
        return notificationService.getAllNotificationsFotUser(userId);
    }

    @GetMapping("/unread/{id}")
    public List<Notification> fetchUsersUnreadNotifications(@PathVariable("id") Integer userId) {
        return notificationService.fetchUsersNotifications(userId);
    }

    @PostMapping("acknowledge")     // set đã nhận thông báo (List notis)
    public ResponseEntity<String> acknowledgeNotifications(@RequestBody AcknowledgeNotificationsDTO body) {
        notificationService.acknowledgeNotification(body.getNotifications());
        return ResponseEntity.ok("Notification acknowledged");
    }
}
