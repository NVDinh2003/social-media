package com.nvd.service;

import com.nvd.exceptions.UnableToResolvePhotoException;
import com.nvd.exceptions.UnableToSavePhotoException;
import com.nvd.models.Image;
import com.nvd.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Transactional
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    private static final File DIRECTORY = new File("D:\\WorkSpace\\Spring_Project\\social-media\\backend\\img");
    private static final String URL = "http://localhost:8000/images/";

    public Image saveGifFromPost(Image image) {
        return imageRepository.save(image);
    }

    public Image uploadImage(MultipartFile file, String prefix) throws UnableToSavePhotoException {
        try {
            // the content type form the request looks something like this img/jpeg
            String extention = "." + file.getContentType().split("/")[1];

            File img = File.createTempFile(prefix, extention, DIRECTORY);

            file.transferTo(img);

            String imageURL = URL + img.getName();

            Image i = new Image(img.getName(), file.getContentType(), img.getPath(), imageURL);

            Image saved = imageRepository.save(i);

//            return "file uploaded successfully: " + img.getName();
            return saved;
        } catch (IOException e) {
            throw new UnableToSavePhotoException();

        }
    }

    public byte[] downloadImage(String filename) throws UnableToResolvePhotoException {
        try {
            Image image = imageRepository.findByImageName(filename).get();

            String filePath = image.getImagePath();

            byte[] imageBytes = Files.readAllBytes(new File(filePath).toPath());

            return imageBytes;
        } catch (IOException e) {
            throw new UnableToResolvePhotoException();
        }
    }

    public String getImageType(String filename) {
        Image image = imageRepository.findByImageName(filename).get();

        return image.getImageType();
    }
}
