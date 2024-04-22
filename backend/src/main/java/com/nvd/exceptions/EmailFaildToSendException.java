package com.nvd.exceptions;

public class EmailFaildToSendException extends RuntimeException {
    public EmailFaildToSendException() {
        super("The email failed to sent!");
    }
}
