package com.nvd.models;

import com.nvd.models.enums.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer notificationId;

    @Enumerated
    @Column(name = "notification_type")
    private NotificationType notificationType;

    @Column(name = "timestamp")
    private LocalDateTime notificationTimestamp;

    private boolean acknowledged;   // user đã xem (nhận) thông báo hay chưa

    @OneToOne
    @JoinColumn(name = "recipient_user_id")
    private ApplicationUser recipient;

    @ManyToOne
    @JoinColumn(name = "action_user_id")
    private ApplicationUser actionUser;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    //TODO: add messages when we get to that point

    public Notification(Integer notificationId, NotificationType notificationType, LocalDateTime notificationTimestamp, boolean acknowledged, ApplicationUser recipient, ApplicationUser actionUser) {
        this.notificationId = notificationId;
        this.notificationType = notificationType;
        this.notificationTimestamp = notificationTimestamp;
        this.acknowledged = acknowledged;
        this.recipient = recipient;
        this.actionUser = actionUser;
    }


    // impliment 2 methods: giúp so sánh và quản lý các đối tượng một cách chính xác hơn
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Notification that = (Notification) o;
        return acknowledged == that.acknowledged
                && Objects.equals(notificationId, that.notificationId)
                && notificationType == that.notificationType
                && Objects.equals(notificationTimestamp, that.notificationTimestamp)
                && Objects.equals(recipient, that.recipient)
                && Objects.equals(actionUser, that.actionUser)
                && Objects.equals(post, that.post);
    }

    @Override
    public int hashCode() {
        return Objects.hash(notificationId, notificationType, notificationTimestamp,
                acknowledged, recipient, actionUser, post);
    }

}
