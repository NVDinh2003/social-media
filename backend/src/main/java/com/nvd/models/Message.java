package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nvd.models.enums.MessageType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer messageId;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "message_type")
    private MessageType messageType;

    @ManyToOne
    @JoinColumn(name = "sent_by")
    private ApplicationUser sentBy;

    @ManyToOne
    @JoinColumn(name = "conversation_id", nullable = false)
    @JsonIgnore
    private Conversation conversation;

    @Column(name = "message_text")
    private String messageText;
    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @ManyToMany
    @JoinTable(
            name = "message_seen_by",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "message_id")
    )
    private Set<ApplicationUser> seenBy;

    @Column(name = "message_image", nullable = true)
    private String messageImage;

    public Message() {
        this.seenBy = new HashSet<>();
        this.sentAt = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(messageId, message.messageId) && messageType == message.messageType && Objects.equals(sentBy, message.sentBy) && Objects.equals(conversation, message.conversation) && Objects.equals(messageText, message.messageText) && Objects.equals(sentAt, message.sentAt) && Objects.equals(seenBy, message.seenBy) && Objects.equals(messageImage, message.messageImage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageId, messageType, sentBy, conversation, messageText, sentAt, seenBy, messageImage);
    }
}
