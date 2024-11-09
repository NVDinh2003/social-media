package com.nvd.exceptions;

public class ConversationDoesNotExistException extends RuntimeException {
    public ConversationDoesNotExistException() {
        super("Conversation does not exist");
    }

    public ConversationDoesNotExistException(String message) {
        super(message);
    }
}