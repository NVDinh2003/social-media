package com.nvd.service;

import com.nvd.dto.response.MessageDTO;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Message;
import com.nvd.models.Notification;
import com.nvd.models.Post;
import com.nvd.models.enums.NotificationType;
import com.nvd.repositories.NotificationRepository;
import com.nvd.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final String notiDestination = Constants.NOTI_DESTINATION;

    private final static List<NotificationType> NON_NEW_NOTIFICATION_TYPES = List.of(
            NotificationType.FOLLOW,
            NotificationType.LIKE,
            NotificationType.REPLY,
            NotificationType.REPOST,
            NotificationType.BOOKMARK,
            NotificationType.MESSAGE,
            NotificationType.MENTION);

    public List<Notification> getAllNotificationsFotUser(Integer userId) {
        ApplicationUser user = userService.getUserById(userId);
        return notificationRepository.getByRecipientAndNotificationTypeInOrderByNotificationTimestampDesc(user,
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
                        .reply(null)
                        .build())
                .collect(Collectors.toList());

        notifications = notificationRepository.saveAll(notifications);

        // send each notification to the correct recipient
        notifications.forEach(notification -> {
            simpMessagingTemplate.convertAndSendToUser(notification.getRecipient().getUsername(),
                    notiDestination, notification);
        });
    }

    public void createAndSendNotifications(NotificationType type, ApplicationUser recipient,
                                           ApplicationUser actionUser, Post post, Post reply) {
        Notification notification = Notification.builder()
                .notificationType(type)
                .notificationTimestamp(LocalDateTime.now())
                .acknowledged(false)
                .recipient(recipient)
                .actionUser(actionUser)
                .post(post)
                .reply(reply)
                .build();

        notification = notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSendToUser(notification.getRecipient().getUsername(),
                notiDestination, notification);
    }

    public void createAndSendFollowNotifications(ApplicationUser recipient, ApplicationUser actionUser) {
        Notification notification = Notification.builder()
                .notificationType(NotificationType.FOLLOW)
                .notificationTimestamp(LocalDateTime.now())
                .acknowledged(false)
                .recipient(recipient)
                .actionUser(actionUser)
                .build();

        notification = notificationRepository.save(notification);
        simpMessagingTemplate.convertAndSendToUser(notification.getRecipient().getUsername(),
                notiDestination, notification);
    }

    public List<Notification> fetchUsersNotifications(Integer userId) {
        ApplicationUser user = userService.getUserById(userId);
        return notificationRepository.getByRecipientAndAcknowledgedFalse(user);
    }

    public void acknowledgeNotification(List<Notification> notifications) {
        List<Notification> acknowledgedNotifications = notifications.stream()
                .map(notification -> {
                    notification.setAcknowledged(true);
                    return notification;
                })
                .toList();

        notificationRepository.saveAll(acknowledgedNotifications);
    }

    public void createAndSendMessageNotifications(List<ApplicationUser> recipients,
                                                  ApplicationUser actionUser, Message message) {
        List<Notification> notifications = recipients.stream()
                .map(user -> Notification.builder()
                        .notificationType(NotificationType.MESSAGE)
                        .notificationTimestamp(LocalDateTime.now())
                        .acknowledged(false)
                        .recipient(user)
                        .actionUser(actionUser)
                        .message(message)
                        .build()).toList();

        notifications = notificationRepository.saveAll(notifications);

        notifications.forEach(noti -> simpMessagingTemplate
                .convertAndSendToUser(noti.getRecipient().getUsername(), notiDestination, noti));

        MessageDTO messageDTO = new MessageDTO(
                message.getMessageId(),
                message.getMessageType(),
                message.getConversation().getConversationId(),
                message.getSentAt(),
                message.getSentBy(),
                message.getSeenBy(),
                message.getMessageImage(),
                message.getMessageText()
        );

        recipients.forEach(user -> simpMessagingTemplate
                .convertAndSendToUser(user.getUsername(), "/messages", messageDTO));
    }

    public void readMessageNotifications(List<Message> messages, ApplicationUser recipient) {
        // lấy tất cả noti liên quan đến list mess
        List<Notification> notifications = notificationRepository.findByMessageIn(messages);

        //  lọc các noti khớp với recipient
        List<Notification> filteredNotifications = notifications.stream()
                .filter(noti -> Objects.equals(noti.getRecipient().getUserId(), recipient.getUserId()))
                .toList();

        this.acknowledgeNotification(filteredNotifications);
    }
}
