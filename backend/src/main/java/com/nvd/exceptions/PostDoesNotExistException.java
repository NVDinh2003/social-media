package com.nvd.exceptions;

public class PostDoesNotExistException extends RuntimeException {
    public PostDoesNotExistException() {
        super("The post requested does not exist!");
    }
}
