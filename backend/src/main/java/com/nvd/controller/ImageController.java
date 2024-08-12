package com.nvd.controller;

import com.nvd.exceptions.UnableToResolvePhotoException;
import com.nvd.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/images")
@CrossOrigin("*")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @ExceptionHandler({UnableToResolvePhotoException.class, UnableToResolvePhotoException.class})
    public ResponseEntity<String> handlePhotoException() {
        return new ResponseEntity<>("Unable to process the photo", HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable String fileName) throws UnableToResolvePhotoException {
        byte[] imageBytes = imageService.downloadImage(fileName);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.valueOf(imageService.getImageType(fileName)))
                .body(imageBytes);
    }
}
