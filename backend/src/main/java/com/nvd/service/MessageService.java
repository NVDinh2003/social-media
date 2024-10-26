package com.nvd.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvd.dto.CreateMessageDTO;
import com.nvd.exceptions.InvalidMessageException;
import com.nvd.exceptions.UnableToCreateMessageException;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Conversation;
import com.nvd.models.Image;
import com.nvd.models.Message;
import com.nvd.repositories.ConversationRepository;
import com.nvd.repositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ImageService imageService;
    private final NotificationService notificationService;
    private final ConversationRepository conversationRepository;


    public Message createMessage(String messagePayload, List<MultipartFile> files) {
        Message message;
        String messageImage = "";

        try {
            // Deserialize the message payload into a CreateMessageDTO object
            ObjectMapper objectMapper = new ObjectMapper();
            CreateMessageDTO dto = objectMapper.readValue(messagePayload, CreateMessageDTO.class);

            // Check if the conversation exists in the database
            Conversation conversation = conversationRepository.findById(dto.getConversation().getConversationId())
                    .orElse(null);
            if (conversation == null || conversation.getConversationId() == null)
                throw new InvalidMessageException("Conversation does not exist.");


            // check xem sender có trong conversation không
            boolean isSenderInConversation = conversation.getConversationUsers()
                    .stream().map(ApplicationUser::getUserId)
                    .toList().contains(dto.getSentBy().getUserId());
            if (!isSenderInConversation)
                throw new InvalidMessageException();


            // Save GIF URL if present
            if (dto.getGifUrl() != null)
                messageImage = imageService.saveGifFromMessage(dto.getGifUrl());

            // Save the first image file if present
            if (!files.isEmpty() && !files.get(0).isEmpty()) {
                Image savedImage = imageService.uploadImage(files.get(0), "msg");
                messageImage = savedImage.getImageURL();
            }

            // Build the message object with or without an image
            if (!messageImage.isEmpty()) {
                message = Message.builder()
                        .messageType(dto.getMessageType())
                        .sentBy(dto.getSentBy())
                        .conversation(dto.getConversation())
                        .messageText(dto.getText())
                        .messageImage(messageImage)
                        .build();
            } else {
                message = Message.builder()
                        .messageType(dto.getMessageType())
                        .sentBy(dto.getSentBy())
                        .conversation(dto.getConversation())
                        .messageText(dto.getText())
                        .build();
            }

            message = messageRepository.save(message);

            // Create and send notifications to other users in the conversation
            List<ApplicationUser> notificationList = message.getConversation().getConversationUsers()
                    .stream()
                    .filter(user -> !user.getUserId().equals(dto.getSentBy().getUserId()))
                    .toList();
            notificationService.createAndSendMessageNotifications(notificationList, message.getSentBy(), message);

            return message;
        } catch (InvalidMessageException e) {
            throw e;
        } catch (Exception e) {
            throw new UnableToCreateMessageException();
        }
    }
}