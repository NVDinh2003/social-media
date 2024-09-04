package com.nvd.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CustomLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

    @Override
    public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException {
        String date = p.getText();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d HH:mm");
        return LocalDateTime.parse(date, formatter);
    }
}
