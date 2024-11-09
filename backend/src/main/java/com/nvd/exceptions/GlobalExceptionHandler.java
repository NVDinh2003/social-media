package com.nvd.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put("error-" + fieldName, errorMessage);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(TooManyRequestsException.class)       // response 429
    public ResponseEntity<?> handleTooManyRequestsException(TooManyRequestsException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.TOO_MANY_REQUESTS);
    }

    @ExceptionHandler({UnableToCreateMessageException.class})
    public ResponseEntity<String> handleUnableToCreateMessage() {
        return ResponseEntity.status(500).body("Unable to create a message at this time, please try again");
    }

    @ExceptionHandler({InvalidMessageException.class})
    public ResponseEntity<String> handleInvalidMessage() {
        return ResponseEntity.status(403).body("You attempted to create an invalid message in this conversation");
    }

    @ExceptionHandler({MessageDoesNotExistException.class})
    public ResponseEntity<String> handleMessageDoesNotExistException() {
        return ResponseEntity.status(404).body("Message does not exist");
    }

    @ExceptionHandler({ConversationDoesNotExistException.class})
    public ResponseEntity<String> handleConversationDoesNotExistException() {
        return new ResponseEntity<String>("Conversation not found", HttpStatus.NOT_FOUND);
    }

}