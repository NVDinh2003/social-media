package com.nvd.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvd.encrypt.AES;
import com.nvd.encrypt.DiffieHellman;
import com.nvd.models.ApplicationUser;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//1. Đánh dấu lớp là final để không thể kế thừa.
//2. Tạo một constructor private để ngăn việc khởi tạo lớp.
//3. Tự động biến tất cả các phương thức trong lớp thành static.
@UtilityClass
@Slf4j
public class MessageUtils {

    /**
     * Encrypt message for all participants including sender
     */
    public static String encryptMessage(String messageText, Integer senderId, List<ApplicationUser> conversationUsers) {
        boolean isGroupChat = conversationUsers.size() > 2;

        if (isGroupChat) {
            // For group chat: encrypt message for all users including sender
            List<Integer> allUserIds = conversationUsers.stream()
                    .map(ApplicationUser::getUserId)
                    .collect(Collectors.toList());

            DiffieHellman diffieHellman = new DiffieHellman();
            Map<Integer, String> encryptedMessages = new HashMap<>();

            // Encrypt for all users including sender
            for (Integer userId : allUserIds) {
                if (userId.equals(senderId)) {
                    // For sender: use their own public and private keys
                    int secretKey = DiffieHellman.genSecretKey(senderId, senderId);
                    encryptedMessages.put(senderId, AES.encrypt(messageText, secretKey));
                } else {
                    // For other recipients: use Diffie-Hellman normally
                    int secretKey = DiffieHellman.genSecretKey(senderId, userId);
                    encryptedMessages.put(userId, AES.encrypt(messageText, secretKey));
                }
            }

            try {
                ObjectMapper mapper = new ObjectMapper();
                return mapper.writeValueAsString(encryptedMessages);
            } catch (JsonProcessingException e) {
                log.error("Error converting encrypted messages to JSON", e);
                throw new RuntimeException("Error encrypting group message");
            }
        } else {
            // For individual chat: encrypt message for both sender and receiver
            Map<Integer, String> encryptedMessages = new HashMap<>();

            // Encrypt for sender
            int senderSecretKey = DiffieHellman.genSecretKey(senderId, senderId);
            encryptedMessages.put(senderId, AES.encrypt(messageText, senderSecretKey));

            // Encrypt for receiver
            ApplicationUser recipient = conversationUsers.stream()
                    .filter(user -> !user.getUserId().equals(senderId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Recipient not found"));

            int recipientSecretKey = DiffieHellman.genSecretKey(senderId, recipient.getUserId());
            encryptedMessages.put(recipient.getUserId(), AES.encrypt(messageText, recipientSecretKey));

            try {
                ObjectMapper mapper = new ObjectMapper();
                return mapper.writeValueAsString(encryptedMessages);
            } catch (JsonProcessingException e) {
                log.error("Error converting encrypted messages to JSON", e);
                throw new RuntimeException("Error encrypting message");
            }
        }
    }

    /**
     * Decrypt message for any user (sender or recipient)
     */
    public static String decryptMessage(String encryptedText, Integer currentUserId, Integer senderId, boolean isGroupMessage) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<Integer, String> encryptedMessages = mapper.readValue(encryptedText,
                    new TypeReference<Map<Integer, String>>() {
                    });

            String userMessage = encryptedMessages.get(currentUserId);
            if (userMessage == null) {
                log.error("No message found for user: {}", currentUserId);
                return null;
            }

            // If current user is the sender
            if (currentUserId.equals(senderId)) {
                int secretKey = DiffieHellman.genSecretKey(senderId, senderId);
                return AES.decrypt(userMessage, secretKey);
            }

            // If current user is a recipient
            if (isGroupMessage) {
                return new DiffieHellman().decryptGroupMessage(userMessage, currentUserId, senderId);
            } else {
                int secretKey = DiffieHellman.genSecretKey(currentUserId, senderId);
                return AES.decrypt(userMessage, secretKey);
            }

        } catch (JsonProcessingException e) {
            log.error("Error decrypting message", e);
            return null;
        }
    }
}
