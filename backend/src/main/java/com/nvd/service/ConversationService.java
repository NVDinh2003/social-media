package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Conversation;
import com.nvd.models.Message;
import com.nvd.repositories.ConversationRepository;
import com.nvd.utils.ConversationComparator;
import com.nvd.utils.MessageComparator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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
        List<Conversation> allConversations = conversationRepository.findAllByConversationUsersIn(userList);

        ConversationComparator cc = new ConversationComparator();
        allConversations.stream().map(conversation -> {
                    List<Message> conversationMessages = conversation.getConversationMessage();
                    Collections.sort(conversationMessages, new MessageComparator());
                    conversation.setConversationMessage(conversationMessages);
                    return conversation;
                })
                .sorted(cc)
                .toList();

        return allConversations;
    }

    public Conversation readOrCreateConversation(List<Integer> conversationUserIds) {
        List<ApplicationUser> conversationUsers = userService.getAllUsersByIds(conversationUserIds);

        List<Conversation> conversations = conversationRepository.findAllByConversationUsersIn(conversationUsers);

        Conversation conversation = null;
        for (Conversation value : conversations) {
            if (usersListsAreTheSame(value.getConversationUsers(), conversationUsers)) {
                conversation = value;
//                break;
            }
        }

        if (conversation != null) {
            List<Message> conversationMessages = conversation.getConversationMessage();
            Collections.sort(conversationMessages, new MessageComparator());
            conversation.setConversationMessage(conversationMessages);
        }

        if (conversation == null) {
            conversation = Conversation.builder()
                    .conversationUsers(conversationUsers)
                    .conversationMessage(new ArrayList<>())
                    .build();
            conversation = conversationRepository.save(conversation);
        }

        return conversation;
    }

    private boolean usersListsAreTheSame(List<ApplicationUser> list1, List<ApplicationUser> list2) {
        return new HashSet<>(list1).equals(new HashSet<>(list2));
    }
}
