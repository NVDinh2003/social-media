package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Integer> {
    List<Conversation> findAllByConversationUsersIn(List<ApplicationUser> users);
}
