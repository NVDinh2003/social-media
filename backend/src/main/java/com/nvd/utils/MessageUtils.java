package com.nvd.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvd.encrypt.AES;
import com.nvd.encrypt.DiffieHellman;
import com.nvd.models.ApplicationUser;
import lombok.experimental.UtilityClass;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//1. Đánh dấu lớp là final để không thể kế thừa.
//2. Tạo một constructor private để ngăn việc khởi tạo lớp.
//3. Tự động biến tất cả các phương thức trong lớp thành static.
@UtilityClass
public class MessageUtils {

    // ma hoa tin nhan
    public String encryptMessage(String messageText, int fromUser, List<ApplicationUser> toUsers) {
        if (messageText.isEmpty()) {
            return "";
        }

        // Nếu chỉ có 2 người (chat 1-1)
        if (toUsers.size() == 1) {
            int toUser = toUsers.get(0).getUserId();
            int key = DiffieHellman.genSecretKey(fromUser, toUser);
            return AES.encrypt(messageText, key);
        }

        // Nếu là group chat
        // Tạo JSON object chứa các tin nhắn được mã hóa cho từng người
        ObjectMapper mapper = new ObjectMapper();
        Map<Integer, String> encryptedMessages = new HashMap<>();

        // Tạo secret key và mã hóa tin nhắn cho từng người trong nhóm
        for (ApplicationUser user : toUsers) {
            // Bỏ qua người gửi
            if (user.getUserId() == fromUser) {
                continue;
            }

            // Mã hóa tin nhắn với secret key của từng người
            int secretKey = DiffieHellman.genSecretKey(fromUser, user.getUserId());
            String encryptedMessage = AES.encrypt(messageText, secretKey);
            encryptedMessages.put(user.getUserId(), encryptedMessage);
        }

        try {
            // Chuyển map thành JSON string để lưu vào database
            return mapper.writeValueAsString(encryptedMessages);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error encrypting group message", e);
        }
    }

    //    private decryptMessageText
//   giải mã tin nhắn
    public String decryptMessage(String encryptedText, int currentUserId, int senderId, boolean isGroupMessage) {
        if (encryptedText == null || encryptedText.isEmpty()) {
            return "";
        }

        // If the current user is the sender, return the encrypted text as is
        if (currentUserId == senderId) {
            return encryptedText;
        }

        // Nếu là chat 1-1
        if (!isGroupMessage) {
            return decryptOneToOneMessage(encryptedText, currentUserId, senderId);
        }

        // Nếu là group chat
        return decryptGroupMessage(encryptedText, currentUserId, senderId);
    }

    private String decryptOneToOneMessage(String encryptedText, int currentUserId, int senderId) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            // Convert JSON string to Map
            Map<Integer, String> encryptedMessages = mapper.readValue(
                    encryptedText,
                    new TypeReference<Map<Integer, String>>() {
                    }
            );

            // Get the encrypted message for the current user
            String userEncryptedMessage = encryptedMessages.get(currentUserId);
            if (userEncryptedMessage == null) {
                return null;
            }

            // Decrypt the message with the user's secret key
            int key = DiffieHellman.genSecretKey(currentUserId, senderId);
            return AES.decrypt(userEncryptedMessage, key);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error decrypting one-to-one message", e);
        }
    }

    private String decryptGroupMessage(String encryptedText, int currentUserId, int senderId) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            // Chuyển JSON string thành Map
            Map<Integer, String> encryptedMessages = mapper.readValue(
                    encryptedText,
                    new TypeReference<Map<Integer, String>>() {
                    }
            );

            // Lấy tin nhắn được mã hóa cho user hiện tại
            String userEncryptedMessage = encryptedMessages.get(currentUserId);
            if (userEncryptedMessage == null) {
                return null;
            }

            // Giải mã tin nhắn với secret key của user
            int key = DiffieHellman.genSecretKey(currentUserId, senderId);
            return AES.decrypt(userEncryptedMessage, key);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error decrypting group message", e);
        }
    }
}
