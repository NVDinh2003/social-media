package com.nvd.controller;

import com.nvd.dto.request.message.HideMessageRequestDTO;
import com.nvd.dto.request.message.MessageReactDTO;
import com.nvd.dto.response.MessageDTO;
import com.nvd.models.Message;
import com.nvd.service.MessageService;
import com.nvd.service.UserService;
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
    private final UserService userService;


    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public MessageDTO sendMessage(@RequestPart("messagePayload") String messagePayload,
                                  @RequestPart("image") List<MultipartFile> image) {
        Message message = messageService.createMessage(messagePayload, image);
        return messageService.decryptMessageAndConvertToMessageDTO(message.getSentBy(), message);
    }

    @PostMapping(value = "/reply", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public MessageDTO sendReplyMessage(@RequestPart("messagePayload") String messagePayload,
                                       @RequestPart("image") List<MultipartFile> image,
                                       @RequestPart("replyTo") String replyTo) {
        return messageService.createReplyMessage(messagePayload, image, replyTo);

    }

    @GetMapping(value = "/read")
    public List<MessageDTO> readMessages(@RequestParam("userId") Integer userId,
                                         @RequestParam("conversationId") Integer conversationId) {
        return messageService.readMessages(userId, conversationId);
    }

    @GetMapping(value = "/{id}")
    public Message getMessageByIdE(@PathVariable("id") Integer messageId) {
        return messageService.getMessageById(messageId);
    }

    @GetMapping(value = "/d/{id}")
    public MessageDTO getMessageByIdD(@PathVariable("id") Integer messageId) {
        return messageService.getMessageByIdD(messageId);
    }

    @PostMapping(value = "/react")
    public Message reactToMessage(@RequestBody MessageReactDTO body) {
        return messageService.reactToMessage(body.getUser(), body.getMessage(), body.getReaction());
    }

    @PostMapping(value = "/hide")
    public MessageDTO hideMessageForUser(@RequestBody HideMessageRequestDTO body) {
        return messageService.hideMessageForUser(body.getUser(), body.getMessageId());
    }
}