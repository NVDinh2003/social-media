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

    private final static List<NotificationType> NON_NEW_NOTIFICATION_TYPES = List.of(
            NotificationType.FOLLOW,
            NotificationType.LIKE,
            NotificationType.REPLY,
            NotificationType.REPOST,
            NotificationType.BOOKMARK,
            NotificationType.MESSAGE);

    public List<Notification> getAllNotificationsFotUser(Integer userId) {
        ApplicationUser user = userService.getUserById(userId);
        return nofiticationRepository.getByRecipientAndNotificationTypeInOrderByNotificationTimestampDesc(user,
                NON_NEW_NOTIFICATION_TYPES);
    }

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

    public void createAndSendNotifications(NotificationType type, ApplicationUser recipient,
                                           ApplicationUser actionUser, Post post) {
        Notification notification = Notification.builder()
                .notificationType(type)
                .notificationTimestamp(LocalDateTime.now())
                .acknowledged(false)
                .recipient(recipient)
                .actionUser(actionUser)
                .post(post)
                .build();

        notification = nofiticationRepository.save(notification);
        simpMessagingTemplate.convertAndSendToUser(notification.getRecipient().getUsername(),
                "/notifications", notification);
    }

    public void createAndSendFollowNotifications(ApplicationUser recipient, ApplicationUser actionUser) {
        Notification notification = Notification.builder()
                .notificationType(NotificationType.FOLLOW)
                .notificationTimestamp(LocalDateTime.now())
                .acknowledged(false)
                .recipient(recipient)
                .actionUser(actionUser)
                .build();

        notification = nofiticationRepository.save(notification);
        simpMessagingTemplate.convertAndSendToUser(notification.getRecipient().getUsername(),
                "/notifications", notification);
    }

    public List<Notification> fetchUsersNotifications(Integer userId) {
        ApplicationUser user = userService.getUserById(userId);
        return nofiticationRepository.getByRecipientAndAcknowledgedFalse(user);
    }

    public void acknowledgeNotification(List<Notification> notifications) {
        List<Notification> acknowledgedNotifications = notifications.stream()
                .map(notification -> {
                    notification.setAcknowledged(true);
                    return notification;
                })
                .toList();

        nofiticationRepository.saveAll(acknowledgedNotifications);
    }
}
