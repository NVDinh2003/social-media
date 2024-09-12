package com.nvd.exceptions;

public class UnableToResolvePhotoException extends Exception {
    public UnableToResolvePhotoException() {
        super("The photo you are looking for cannot be found");
    }

    public UnableToResolvePhotoException(String message) {
        super(message);
    }
}
