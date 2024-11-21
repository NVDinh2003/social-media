package com.nvd.repositories;

import com.nvd.models.MessageReaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageReactionRepository extends JpaRepository<MessageReaction, Integer> {
    //Optional<MessageReaction> findByReactionUserAndMessage(ApplicationUser user, Message message);
}