package com.nvd.controller;

import com.nvd.dto.response.MessageDTO;
import com.nvd.models.Message;
import com.nvd.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public MessageDTO sendMessage(@RequestPart("messagePayload") String messagePayload,
                                  @RequestPart("image") List<MultipartFile> image) {
        Message message = messageService.createMessage(messagePayload, image);
        return new MessageDTO(
                message.getMessageId(),
                message.getMessageType(),
                message.getConversation().getConversationId(),
                message.getSentAt(),
                message.getSentBy(),
                message.getSeenBy(),
                message.getMessageImage(),
                message.getMessageText()
        );
    }

//    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    public Message sendMessage(@RequestPart("messagePayload") String messagePayload,
//                               @RequestPart(value = "image", required = false) List<MultipartFile> image) {
//        return messageService.createMessage(messagePayload, image);
//    }
}