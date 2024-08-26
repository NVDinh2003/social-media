package com.nvd.exceptions;

public class UnableToCreatePostException extends RuntimeException {
    public UnableToCreatePostException() {
        super("Unable to create a post at this time!");
    }
}
