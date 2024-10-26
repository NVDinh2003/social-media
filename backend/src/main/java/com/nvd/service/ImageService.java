package com.nvd.service;

import com.nvd.dto.response.cloud.CloudinaryResponse;
import com.nvd.exceptions.UnableToResolvePhotoException;
import com.nvd.exceptions.UnableToSavePhotoException;
import com.nvd.models.Image;
import com.nvd.repositories.ImageRepository;
import com.nvd.service.cloud.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;
    private final CloudinaryService cloudinaryService;

    public Optional<Image> getImageByImageName(String name) {
        return imageRepository.findByImageName(name);
    }

    public Image saveGifFromPost(Image image) {
        return imageRepository.save(image);
    }

    // save image tại local
    private static final File DIRECTORY = new File("D:\\WorkSpace\\Spring_Project\\social-media\\backend\\img");
    private static final String URL = "http://localhost:8000/images/";

    public Image uploadImage(MultipartFile file, String prefix) throws UnableToSavePhotoException {
        try {
            // the content type form the request looks something like this img/jpeg
            String extention = "." + file.getContentType().split("/")[1];

            if (!DIRECTORY.exists()) {
                DIRECTORY.mkdirs(); // tạo thư mục nếu chưa tồn tại
            }

            File img = File.createTempFile(prefix, extention, DIRECTORY);

            file.transferTo(img);

            String imageURL = URL + img.getName();

            Image i = new Image(img.getName(), file.getContentType(), img.getPath(), imageURL);

            return imageRepository.save(i);
        } catch (IOException e) {
            throw new UnableToSavePhotoException();

        }
    }

    // Upload ảnh lên Cloudinary
//    public Image uploadImage(MultipartFile file, String prefix) throws UnableToSavePhotoException {
//        try {
//            FileUploadUtil.assertAllowed(file, FileUploadUtil.IMAGE_PATTERN);
//            String tempFileName = file.getOriginalFilename();
//            if (tempFileName == null || tempFileName.isEmpty())
//                throw new UnableToSavePhotoException();
//
//            int index = tempFileName.lastIndexOf(".");
//            if (index > 0)
//                tempFileName = tempFileName.substring(0, index);
//            final String fileName = prefix + FileUploadUtil.getFileName(tempFileName);
//
//            // Upload ảnh lên Cloudinary
//            final CloudinaryResponse response = cloudinaryService.uploadImage(file, fileName);
//            Image image = new Image(fileName, file.getContentType(), null, response.getUrl());
//            return imageRepository.save(image);
//        } catch (Exception e) {
//            throw new UnableToSavePhotoException();
//        }
//    }


    public Image createOrganization(MultipartFile file, String organizationName) throws UnableToSavePhotoException {
        try {
            String extention = "." + file.getContentType().split("/")[1];
            String fileName = organizationName + extention;
            CloudinaryResponse response = cloudinaryService.uploadImage(file, fileName);
            Image image = new Image(fileName, file.getContentType(), null, response.getUrl());
            return imageRepository.save(image);

        } catch (Exception e) {
            e.printStackTrace();
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

    // Message
    public String saveGifFromMessage(String url) {
        UUID uuid = UUID.randomUUID();
        String gifName = "msg-" + uuid;
        Image image = new Image(gifName, "gif", url, url);
        imageRepository.save(image);
        return url;
    }

}
