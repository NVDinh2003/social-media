package com.nvd.exceptions;

public class IncorrectVerificationCodeException extends RuntimeException {

    public IncorrectVerificationCodeException() {
        super("The verification code provided is incorrect!");
    }
}
