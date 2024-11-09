package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Entity
@Table(name = "message_reactions")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageReaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_reaction_id")
    private Integer messageReactionId;

    private String reaction;

    // kiểm tra reactionUser neu có sự thay đổi và tự động cập nhật reactionUser trong CSDL
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "message_reaction_user", referencedColumnName = "user_id")
    private ApplicationUser reactionUser;

    @ManyToOne
    @JoinColumn(name = "message_id")
    @JsonIgnore
    private Message message;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MessageReaction that = (MessageReaction) o;
        return Objects.equals(messageReactionId, that.messageReactionId) && Objects.equals(reaction, that.reaction) && Objects.equals(reactionUser, that.reactionUser) && Objects.equals(message, that.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageReactionId, reaction, reactionUser, message);
    }
}
