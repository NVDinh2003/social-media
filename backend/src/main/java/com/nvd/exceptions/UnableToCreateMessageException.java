package com.nvd.exceptions;

public class UnableToCreateMessageException extends RuntimeException {
    public UnableToCreateMessageException() {
        super("Unable to create message at this time");
    }

    public UnableToCreateMessageException(String message) {
        super(message);
    }
}