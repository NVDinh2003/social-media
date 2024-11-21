package com.nvd.dto.response;

import com.nvd.models.ApplicationUser;
import com.nvd.models.MessageReaction;
import com.nvd.models.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private Integer messageId;
    private MessageType messageType;
    private Integer conversationId;
    private LocalDateTime sentAt;
    private ApplicationUser sentBy;
    private Set<ApplicationUser> seenBy;
    private String messageImage;
    private String messageText;
    private MessageDTO replyTo;
    private Set<MessageReaction> reactions;
    private Set<ApplicationUser> hiddenBy;

}
