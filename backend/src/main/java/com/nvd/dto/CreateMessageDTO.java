package com.nvd.dto;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Conversation;
import com.nvd.models.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMessageDTO {
    private MessageType messageType;
    private ApplicationUser sentBy;
    private Conversation conversation;
    private String text;
    private String gifUrl;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreateMessageDTO that = (CreateMessageDTO) o;
        return messageType == that.messageType && Objects.equals(sentBy, that.sentBy) && Objects.equals(conversation, that.conversation) && Objects.equals(text, that.text) && Objects.equals(gifUrl, that.gifUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageType, sentBy, conversation, text, gifUrl);
    }
}
