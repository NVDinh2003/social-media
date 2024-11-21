package com.nvd.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "message_reactions")
public class MessageReaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "message_reaction_id")
    private Integer messageReactionId;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "message_reaction_user", referencedColumnName = "user_id")
    ApplicationUser reactionUser;

    @Column(name = "reaction")
    private String reaction;

    public MessageReaction(ApplicationUser reactionUser, String reaction) {
        this.reactionUser = reactionUser;
        this.reaction = reaction;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        MessageReaction that = (MessageReaction) o;
        return Objects.equals(messageReactionId, that.messageReactionId) && Objects.equals(reactionUser, that.reactionUser) && Objects.equals(reaction, that.reaction);
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageReactionId, reactionUser, reaction);
    }
}
