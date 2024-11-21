package com.nvd.controller;

import com.nvd.dto.request.message.HideMessageRequestDTO;
import com.nvd.dto.request.message.MessageReactDTO;
import com.nvd.dto.response.MessageDTO;
import com.nvd.dto.response.ReadMessageResponseDTO;
import com.nvd.models.Message;
import com.nvd.service.MessageService;
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

    @GetMapping(value = "/")
    public Message getMessage(@RequestParam("id") Integer id) {
        return messageService.getById(id);
    }

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
    public ReadMessageResponseDTO readMessages(@RequestParam("userId") Integer userId,
                                               @RequestParam("conversationId") Integer conversationId) {
        return messageService.readMessages(userId, conversationId);
    }


    @PostMapping(value = "/react")
    public MessageDTO reactToMessage(@RequestBody MessageReactDTO body) {
        return messageService.reactToMessage(body.getUser(), body.getMessageId(), body.getReaction());
    }

    @PostMapping(value = "/hide")
    public MessageDTO hideMessageForUser(@RequestBody HideMessageRequestDTO body) {
        return messageService.hideMessageForUser(body.getUser(), body.getMessageId());
    }

}