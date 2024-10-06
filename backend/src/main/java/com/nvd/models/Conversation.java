package com.nvd.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "conversations")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer conversationId;

    @ManyToMany
    @JoinTable(
            name = "conversation_user_junction",
            joinColumns = @JoinColumn(name = "conversation_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    List<ApplicationUser> conversationUsers;

    @OneToMany(mappedBy = "conversation")
    private List<Message> conversationMessages;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Conversation that = (Conversation) o;
        return Objects.equals(conversationId, that.conversationId) && Objects.equals(conversationUsers, that.conversationUsers) && Objects.equals(conversationMessages, that.conversationMessages);
    }

    @Override
    public int hashCode() {
        return Objects.hash(conversationId, conversationUsers, conversationMessages);
    }
}
