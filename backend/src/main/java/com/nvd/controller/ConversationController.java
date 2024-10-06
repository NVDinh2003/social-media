package com.nvd.controller;

import com.nvd.dto.request.FindConversationRequest;
import com.nvd.models.Conversation;
import com.nvd.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversations")
@RequiredArgsConstructor
public class ConversationController {
    private final ConversationService conversationService;

    @GetMapping()
    List<Conversation> getUsersConversations(@RequestParam(name = "userId") Integer userId) {
        return conversationService.readAllConversationsWithUser(userId);
    }

    @PostMapping()
    public Conversation getOrCreateConversation(@RequestBody FindConversationRequest body) {
        return conversationService.readOrCreateConversation(body.getUserIds());
    }
}
