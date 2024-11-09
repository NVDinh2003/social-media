package com.nvd.controller;

import com.nvd.dto.request.message.HideMessageRequestDTO;
import com.nvd.dto.request.message.MessageReactDTO;
import com.nvd.dto.response.MessageDTO;
import com.nvd.mappers.MessageMapper;
import com.nvd.models.Message;
import com.nvd.service.MessageService;
import com.nvd.utils.MessageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final MessageMapper messageMapper;


    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public MessageDTO sendMessage(@RequestPart("messagePayload") String messagePayload,
                                  @RequestPart("image") List<MultipartFile> image) {
        Message message = messageService.createMessage(messagePayload, image);
        MessageDTO dto = new MessageDTO(
                message.getMessageId(),
                message.getMessageType(),
                message.getConversation().getConversationId(),
                message.getSentAt(),
                message.getSentBy(),
                message.getSeenBy(),
                message.getMessageImage(),
                ""
        );

        String decryptedText = MessageUtils.decryptMessage(
                message.getMessageText(),
                message.getSentBy().getUserId(),
                message.getSentBy().getUserId(),
                message.getConversation().getConversationUsers().size() > 2
        );
        dto.setMessageText(decryptedText);

        return dto;
    }

    @PostMapping(value = "/reply", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public MessageDTO sendReply(@RequestPart("messagePayload") String messagePayload, @RequestPart("image") List<MultipartFile> image, @RequestPart("replyTo") String replyTo) {
        Message message = messageService.createReply(messagePayload, image, replyTo);
        return messageMapper.convertToDTO(message);
    }

    @GetMapping(value = "/read")
    public List<Message> readMessages(@RequestParam("userId") Integer userId, @RequestParam("conversationId") Integer conversationId) {
        return messageService.readMessages(userId, conversationId);
    }

    @PostMapping(value = "/react")
    public Message reactToMessage(@RequestBody MessageReactDTO body) {
        return messageService.reactToMessage(body.getUser(), body.getMessage(), body.getReaction());
    }

    @PostMapping(value = "/hide")
    public Message hideMessageForUser(@RequestBody HideMessageRequestDTO body) {
        return messageService.hideMessageForUser(body.getUser(), body.getMessageId());
    }
}