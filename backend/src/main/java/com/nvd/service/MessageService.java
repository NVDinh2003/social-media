package com.nvd.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvd.dto.request.message.CreateMessageDTO;
import com.nvd.dto.response.ConversationDTO;
import com.nvd.dto.response.MessageDTO;
import com.nvd.dto.response.ReadMessageResponseDTO;
import com.nvd.exceptions.InvalidMessageException;
import com.nvd.exceptions.MessageDoesNotExistException;
import com.nvd.exceptions.UnableToCreateMessageException;
import com.nvd.mappers.ConversationMapper;
import com.nvd.mappers.MessageMapper;
import com.nvd.models.*;
import com.nvd.models.enums.MessageType;
import com.nvd.repositories.ConversationRepository;
import com.nvd.repositories.MessageReactionRepository;
import com.nvd.repositories.MessageRepository;
import com.nvd.utils.MessageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final ImageService imageService;
    private final NotificationService notificationService;
    private final ConversationRepository conversationRepository;
    private final UserService userService;
    private final ConversationService conversationService;
    private final MessageReactionRepository messageReactionRepository;
    private final MessageMapper messageMapper;
    private final ConversationMapper conversationMapper;

    public Message getById(Integer messageId) {
        return messageRepository.getById(messageId);
    }

    public List<Message> findAllMessagesByConversation(Conversation conversation) {
        return messageRepository.findAllByConversation(conversation);
    }

    @Transactional
    public Message createMessage(String messagePayload, List<MultipartFile> files) {
        Message message;
        String messageImage = "";

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            CreateMessageDTO dto = objectMapper.readValue(messagePayload, CreateMessageDTO.class);

            // Validate conversation
            Conversation conversation = conversationRepository.findById(dto.getConversation().getConversationId())
                    .orElseThrow(() -> new InvalidMessageException("Conversation does not exist."));

            // check xem sender có trong conversation không
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
            }

            if (!files.isEmpty() && !files.get(0).isEmpty()) {
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

            message.setHiddenBy(new HashSet<>());
            message.setReactions(new HashSet<>());

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

    public MessageDTO createReplyMessage(String messagePayload, List<MultipartFile> files, String replyTo) {
        Integer replyToId = Integer.parseInt(replyTo);
        Message replyToMessage = messageRepository.findById(replyToId)
                .orElseThrow(MessageDoesNotExistException::new);
        Message message = this.createMessage(messagePayload, files);

        message.setReplyTo(replyToMessage);
        message.setMessageType(MessageType.REPLY);

        MessageDTO messageDTO = decryptMessageAndConvertToMessageDTO(message.getSentBy(), message);
        MessageDTO replyToMessageDTO = decryptMessageAndConvertToMessageDTO(message.getSentBy(), replyToMessage);
        messageDTO.setReplyTo(replyToMessageDTO);

        return messageDTO;
    }

    public ReadMessageResponseDTO readMessages(Integer userId, Integer conversationId) {
        //TODO: Pass back the updated read messages, the updated conversation, the read notifications

        ApplicationUser user = userService.getUserById(userId);
        Conversation conversation = conversationService.findById(conversationId);

        // get list of messages from conversation
        List<Message> messagesToRead = conversation.getConversationMessage()
                .stream()
                // lọc các mess không phải của user hiện tại gửi (loại trừ mess của current user)
                .filter(message -> !message.getSeenBy().contains(user) && !Objects.equals(message.getSentBy().getUserId(), userId))
                .peek(message -> message.getSeenBy().add(user))
                .toList();

        // set lại noti (các mess đã được đọc, để không hiện . noti mess mới nữa)
        List<Notification> notifications = notificationService.readMessageNotifications(messagesToRead, user);

        messagesToRead = messageRepository.saveAll(messagesToRead);

        List<MessageDTO> readMessagesDto = messagesToRead.stream()
                .map(message -> {
                    MessageDTO dto = messageMapper.convertToDTO(message);
                    String decryptedText = MessageUtils.decryptMessage(
                            message.getMessageText(),
                            userId,
                            message.getSentBy().getUserId(),
                            message.getConversation().getConversationUsers().size() > 2
                    );
                    dto.setMessageText(decryptedText);
                    return dto;
                })
                .toList();

        // Create ConversationDTO
        ConversationDTO conversationDTO = conversationMapper.convertToDTO(conversation);

        // Decrypt each message in the conversation for the response only
        List<MessageDTO> decryptedMessagesDto = conversationDTO.getConversationMessage().stream()
                .map(message -> {
//                    MessageDTO dto = messageMapper.convertToDTO(message);

                    boolean isGroupMessage = conversation.getConversationUsers().size() > 2;
                    String decryptedText = MessageUtils.decryptMessage(
                            message.getMessageText(),
                            userId,
                            message.getSentBy().getUserId(),
                            isGroupMessage
                    );
                    message.setMessageText(decryptedText);
                    return message;
                })
                .toList();

        conversationDTO.setConversationMessage(decryptedMessagesDto);

//        List<MessageDTO> aaa = readMessagesDto;

        return new ReadMessageResponseDTO(readMessagesDto, conversationDTO, notifications);
    }

//    public MessageDTO reactToMessage2(ApplicationUser user, Message message, String reaction) {
//        // check xem user đã reaction mess này chưa
//        boolean deleted = messageReactionService.reactionExists(user, reaction, message);
//        // tạo hoặc hủy reaction mess này cho user hiện tại
//        MessageReaction messageReaction = messageReactionService.createOrDeleteReaction(user, reaction, message);
//
//        // lấy reactions của mess hiện tại
//        Set<MessageReaction> messageReactions = message.getReactions();
//
//
//        if (deleted) { // nếu đã thả react thì hủy react đó ra khỏi list
//            messageReactions.stream().filter(r -> r.getMessageReactionId() != messageReaction.getMessageReactionId())
//                    .toList();
//        } else { // chưa thì thêm react
//            messageReactions.add(messageReaction);
//        }
//        message.setReactions(messageReactions);
//
//        return messageMapper.convertToDTO(message);
//    }

    public MessageDTO reactToMessage(ApplicationUser user, Integer messageId, String reaction) {
        Message message = messageRepository.findById(messageId).orElseThrow();
        Set<MessageReaction> reactions = message.getReactions();

        // find reaction of current user in message
        Optional<MessageReaction> currentReaction = reactions.stream()
                .filter(r -> r.getReactionUser().getUserId().equals(user.getUserId()))
                .findFirst();

        if (currentReaction.isPresent()) {
            MessageReaction currentMessageReaction = currentReaction.get();
            reactions.remove(currentMessageReaction);
            messageReactionRepository.delete(currentMessageReaction);
            if (!currentMessageReaction.getReaction().equals(reaction)) {
                MessageReaction newReaction = new MessageReaction(user, reaction);
                reactions.add(messageReactionRepository.save(newReaction));
            }
        } else {
            MessageReaction newReaction = new MessageReaction(user, reaction);
            reactions.add(messageReactionRepository.save(newReaction));
        }

        message.setReactions(reactions);
        message = messageRepository.save(message);

        MessageDTO m = messageMapper.convertToDTO(message);
        return m;
    }

    public MessageDTO hideMessageForUser(ApplicationUser user, Integer messageId) {
        Message message = messageRepository.findById(messageId).orElseThrow();
        Set<ApplicationUser> hiddenUsers = message.getHiddenBy();
        hiddenUsers.add(user);
        message.setHiddenBy(hiddenUsers);
        return decryptMessageAndConvertToMessageDTO(user, messageRepository.save(message));
    }

    public MessageDTO decryptMessageAndConvertToMessageDTO(ApplicationUser currentUser, Message message) {
        MessageDTO dto = messageMapper.convertToDTO(message);

        String decryptedText = MessageUtils.decryptMessage(
                message.getMessageText(),
                currentUser.getUserId(),
                message.getSentBy().getUserId(),
                message.getConversation().getConversationUsers().size() > 2
        );
        dto.setMessageText(decryptedText);

        return dto;
    }

}