package com.nvd.exceptions;

public class MessageDoesNotExistException extends RuntimeException {
    public MessageDoesNotExistException() {
        super("Message does not exist");
    }

    public MessageDoesNotExistException(String message) {
        super(message);
    }
}