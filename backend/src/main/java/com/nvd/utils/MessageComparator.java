package com.nvd.utils;

import com.nvd.models.Message;

import java.util.Comparator;

public class MessageComparator implements Comparator<Message> {
    @Override
    public int compare(Message arg0, Message arg1) {
        // TODO Auto-generated method stub
        // Compare messages based on their sentAt timestamps
        return arg0.getSentAt().compareTo(arg1.getSentAt());
    }
}