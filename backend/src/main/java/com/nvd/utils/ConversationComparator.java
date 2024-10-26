package com.nvd.utils;

import com.nvd.models.Conversation;

import java.util.Comparator;

// ss dựa trên tin nhắn mới nhất giữa 2 conversation
public class ConversationComparator implements Comparator<Conversation> {
    @Override
    public int compare(Conversation arg0, Conversation arg1) {
        // If both conversations have no messages, they are considered equal
        if (arg0.getConversationMessage().isEmpty() && arg1.getConversationMessage().isEmpty())
            return 0;

        // If only the first conversation has messages, it is considered greater
        if (!arg0.getConversationMessage().isEmpty() && arg1.getConversationMessage().isEmpty())
            return 1;

        // If only the second conversation has messages, it is considered greater
        if (arg0.getConversationMessage().isEmpty() && !arg1.getConversationMessage().isEmpty())
            return -1;

        // Compare the sentAt timestamps of the last messages in each conversation
        Integer lastMessageIn0 = arg0.getConversationMessage().size() - 1;
        Integer lastMessageIn1 = arg1.getConversationMessage().size() - 1;
        return arg0.getConversationMessage().get(lastMessageIn0).getSentAt()
                .compareTo(arg1.getConversationMessage().get(lastMessageIn1).getSentAt());
    }
}