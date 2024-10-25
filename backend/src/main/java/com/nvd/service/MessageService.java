package com.nvd.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvd.dto.CreateMessageDTO;
import com.nvd.models.Message;
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


    public Message createMessage(String messagePayload, List<MultipartFile> files) {
        Message message = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            CreateMessageDTO dto = objectMapper.readValue(messagePayload, CreateMessageDTO.class);
            message = Message.builder().messageType(dto.getMessageType()).
                    sentBy(dto.getSentBy()).conversation(dto.getConversation()).messageText(dto.getText()).build();
            return messageRepository.save(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}