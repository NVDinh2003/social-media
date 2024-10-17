package com.nvd.exceptions;

import java.io.Serial;

public class FileErrorException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 5003320033602480096L;

    public FileErrorException(final String message) {
        super(message);
    }
}
