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
import com.nvd.utils.MessageUtils;
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
            ObjectMapper objectMapper = new ObjectMapper();
            CreateMessageDTO dto = objectMapper.readValue(messagePayload, CreateMessageDTO.class);

            // Validate conversation
            Conversation conversation = conversationRepository.findById(dto.getConversation().getConversationId())
                    .orElseThrow(() -> new InvalidMessageException("Conversation does not exist."));

            // Validate sender
            boolean isSenderInConversation = conversation.getConversationUsers()
                    .stream()
                    .map(ApplicationUser::getUserId)
                    .anyMatch(id -> id.equals(dto.getSentBy().getUserId()));
            if (!isSenderInConversation) {
                throw new InvalidMessageException();
            }

            // Handle images/GIFs
            if (dto.getGifUrl() != null) {
                messageImage = imageService.saveGifFromMessage(dto.getGifUrl());
            } else if (!files.isEmpty() && !files.get(0).isEmpty()) {
                Image savedImage = imageService.uploadImage(files.get(0), "msg");
                messageImage = savedImage.getImageURL();
            }

            // Encrypt message for all users in conversation
            String encryptedMessageText = MessageUtils.encryptMessage(
                    dto.getText(),
                    dto.getSentBy().getUserId(),
                    dto.getConversation().getConversationUsers()
            );
            // Build and save message
            message = Message.builder()
                    .messageType(dto.getMessageType())
                    .sentBy(dto.getSentBy())
                    .conversation(dto.getConversation())
                    .messageText(encryptedMessageText)
                    .messageImage(!messageImage.isEmpty() ? messageImage : null)
                    .build();

            message = messageRepository.save(message);

            // Send notifications
            List<ApplicationUser> notificationRecipients = message.getConversation().getConversationUsers()
                    .stream()
                    .filter(user -> !user.getUserId().equals(dto.getSentBy().getUserId()))
                    .toList();
            notificationService.createAndSendMessageNotifications(notificationRecipients, message.getSentBy(), message);

            return message;
        } catch (InvalidMessageException e) {
            throw e;
        } catch (Exception e) {
            throw new UnableToCreateMessageException();
        }
    }


    // old methods

//    public Message createMessage(String messagePayload, List<MultipartFile> files) {
//        Message message;
//        String messageImage = "";
//
//        try {
//            // Deserialize the message payload into a CreateMessageDTO object
//            ObjectMapper objectMapper = new ObjectMapper();
//            CreateMessageDTO dto = objectMapper.readValue(messagePayload, CreateMessageDTO.class);
//
//            // Check if the conversation exists in the database
//            Conversation conversation = conversationRepository.findById(dto.getConversation().getConversationId())
//                    .orElse(null);
//            if (conversation == null || conversation.getConversationId() == null)
//                throw new InvalidMessageException("Conversation does not exist.");
//
//
//            // check xem sender có trong conversation không
//            boolean isSenderInConversation = conversation.getConversationUsers()
//                    .stream().map(ApplicationUser::getUserId)
//                    .toList().contains(dto.getSentBy().getUserId());
//            if (!isSenderInConversation)
//                throw new InvalidMessageException();
//
//
//            // Save GIF URL if present
//            if (dto.getGifUrl() != null)
//                messageImage = imageService.saveGifFromMessage(dto.getGifUrl());
//
//            // Save the first image file if present
//            if (!files.isEmpty() && !files.get(0).isEmpty()) {
//                Image savedImage = imageService.uploadImage(files.get(0), "msg");
//                messageImage = savedImage.getImageURL();
//            }
//
//            // mã hóa tin nhắn
//            String encryptMessageText = encryptMessage(dto.getText(), dto.getSentBy().getUserId(),
//                    dto.getConversation().getConversationUsers().get(0).getUserId());
//
//
//            // Build the message object with or without an image
//            if (!messageImage.isEmpty()) {
//                message = Message.builder()
//                        .messageType(dto.getMessageType())
//                        .sentBy(dto.getSentBy())
//                        .conversation(dto.getConversation())
////                        .messageText(dto.getText())
//                        .messageText(encryptMessageText)
//                        .messageImage(messageImage)
//                        .build();
//            } else {
//                message = Message.builder()
//                        .messageType(dto.getMessageType())
//                        .sentBy(dto.getSentBy())
//                        .conversation(dto.getConversation())
////                        .messageText(dto.getText())
//                        .messageText(encryptMessageText)
//                        .build();
//            }
//
//            message = messageRepository.save(message);
//
//            // Create and send notifications to other users in the conversation
//            List<ApplicationUser> notificationList = message.getConversation().getConversationUsers()
//                    .stream()
//                    .filter(user -> !user.getUserId().equals(dto.getSentBy().getUserId()))
//                    .toList();
//            notificationService.createAndSendMessageNotifications(notificationList, message.getSentBy(), message);
//
//            return message;
//        } catch (InvalidMessageException e) {
//            throw e;
//        } catch (Exception e) {
//            throw new UnableToCreateMessageException();
//        }
//    }
//
//    String encryptMessage(String messageText, int fromUser, int toUser) {
//        String rarMess = "";
//        if (!messageText.equals("")) {
//            // mã hóa nội dung tin nhắn
//
//            // Step1. Get SecretKey from u1, u2
//            int key = DiffieHellman.genSecretKey(fromUser, toUser);
//
//            // Step2. encode message
//            rarMess = AES.encrypt(messageText, key);
//        }
//        return rarMess;
//    }
}