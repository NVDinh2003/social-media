package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Message;
import com.nvd.models.MessageReaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MessageReactionRepository extends JpaRepository<MessageReaction, Integer> {
    Optional<MessageReaction> findByReactionUserAndReactionAndMessage(ApplicationUser reactionUser, String reaction, Message message);
}