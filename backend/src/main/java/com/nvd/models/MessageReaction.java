package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
