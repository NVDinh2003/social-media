package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Conversation;
import com.nvd.repositories.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final UserService userService;

    public List<Conversation> readAllConversationsWithUser(Integer userId) {
        ApplicationUser user = userService.getUserById(userId);
        List<ApplicationUser> userList = List.of(user);

        return conversationRepository.findAllByConversationUsersIn(userList);
    }

    public Conversation readOrCreateConversation(List<Integer> conversationUserIds) {
        List<ApplicationUser> conversationUsers = userService.getAllUsersByIds(conversationUserIds);

        List<Conversation> conversations = conversationRepository.findAllByConversationUsersIn(conversationUsers);

        Conversation conversation = null;
        for (int i = 0; i < conversations.size(); i++) {
            if (usersListsAreTheSame(conversations.get(i).getConversationUsers(), conversationUsers)) {
                conversation = conversations.get(i);
//                break;
            }
        }

        if (conversation == null) {
            conversation = Conversation.builder()
                    .conversationUsers(conversationUsers)
                    .build();
            conversation = conversationRepository.save(conversation);
        }

        return conversation;
    }

    private boolean usersListsAreTheSame(List<ApplicationUser> list1, List<ApplicationUser> list2) {
        return new HashSet<>(list1).equals(new HashSet<>(list2));
    }
}
