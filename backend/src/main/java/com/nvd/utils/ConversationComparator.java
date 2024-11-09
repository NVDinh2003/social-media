package com.nvd.utils;

import com.nvd.models.Conversation;

import java.util.Comparator;

// ss dựa trên tin nhắn mới nhất giữa 2 conversation
public class ConversationComparator implements Comparator<Conversation> {
    @Override
    public int compare(Conversation arg0, Conversation arg1) {
        // TODO Auto-generated method stub
        if (arg0.getConversationMessage().size() == 0 && arg1.getConversationMessage().size() == 0)
            return 0;
        if (arg0.getConversationMessage().size() != 0 && arg1.getConversationMessage().size() == 0)
            return 1;
        if (arg0.getConversationMessage().size() == 0 && arg1.getConversationMessage().size() != 0)
            return -1;

        Integer lastMessageIn0 = arg0.getConversationMessage().size() - 1;
        Integer lastMessageIn1 = arg1.getConversationMessage().size() - 1;

        return arg0.getConversationMessage().get(lastMessageIn0).getSentAt()
                .compareTo(arg1.getConversationMessage().get(lastMessageIn1).getSentAt());
    }
}