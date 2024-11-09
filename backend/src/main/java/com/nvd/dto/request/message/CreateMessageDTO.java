package com.nvd.dto.request.message;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Conversation;
import com.nvd.models.Message;
import com.nvd.models.MessageReaction;
import com.nvd.models.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
import java.util.Set;

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
    private Message replyTo;
    private Set<MessageReaction> messageReactions;
    private Set<ApplicationUser> hiddenBy;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreateMessageDTO that = (CreateMessageDTO) o;
        return messageType == that.messageType && Objects.equals(sentBy, that.sentBy) && Objects.equals(conversation, that.conversation) && Objects.equals(text, that.text) && Objects.equals(gifUrl, that.gifUrl) && Objects.equals(replyTo, that.replyTo) && Objects.equals(messageReactions, that.messageReactions) && Objects.equals(hiddenBy, that.hiddenBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageType, sentBy, conversation, text, gifUrl, replyTo, messageReactions, hiddenBy);
    }
}
