package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Notification;
import com.nvd.models.Post;
import com.nvd.models.enums.NotificationType;
import com.nvd.repositories.NofiticationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NofiticationRepository nofiticationRepository;
    private final UserService userService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    public void createAndSendPostNotifications(Post post) {
        ApplicationUser author = userService.getUserById(post.getAuthor().getUserId());
        Set<ApplicationUser> followers = userService.retrieveFollowersList(author.getUsername());

        List<Notification> notifications = followers.stream()
                .map(follower -> Notification.builder()
                        .notificationType(NotificationType.NEW_POST)
                        .notificationTimestamp(LocalDateTime.now())
                        .acknowledged(true)
                        .recipient(follower)
                        .actionUser(author)
                        .post(post)
                        .build())
                .collect(Collectors.toList());

        notifications = nofiticationRepository.saveAll(notifications);

        // send each notification to the correct recipient
        notifications.forEach(notification -> {
            simpMessagingTemplate.convertAndSendToUser(notification.getRecipient().getUsername(),
                    "/notifications", notification);
        });
    }
}
