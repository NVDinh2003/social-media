package com.nvd.service;

import com.nvd.dto.response.cloud.CloudinaryResponse;
import com.nvd.exceptions.UnableToResolvePhotoException;
import com.nvd.exceptions.UnableToSavePhotoException;
import com.nvd.models.Image;
import com.nvd.repositories.ImageRepository;
import com.nvd.service.cloud.CloudinaryService;
import com.nvd.utils.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;
    private final CloudinaryService cloudinaryService;

    private static final File DIRECTORY = new File("D:\\WorkSpace\\Spring_Project\\social-media\\backend\\img");
    private static final String URL = "http://localhost:8000/images/";


    public Optional<Image> getImageByImageName(String name) {
        return imageRepository.findByImageName(name);
    }

    public Image saveGifFromPost(Image image) {
        return imageRepository.save(image);
    }


    public Image uploadImage(MultipartFile file, String prefix) throws UnableToSavePhotoException {
        try {
            FileUploadUtil.assertAllowed(file, FileUploadUtil.IMAGE_PATTERN);
            String tempFileName = file.getOriginalFilename();
            if (tempFileName == null || tempFileName.isEmpty())
                throw new UnableToSavePhotoException();

            int index = tempFileName.lastIndexOf(".");
            if (index > 0)
                tempFileName = tempFileName.substring(0, index);
            final String fileName = prefix + FileUploadUtil.getFileName(tempFileName);

            // Upload ảnh lên Cloudinary
            final CloudinaryResponse response = cloudinaryService.uploadImage(file, fileName);
            Image image = new Image(fileName, file.getContentType(), null, response.getUrl());
            return imageRepository.save(image);
        } catch (Exception e) {
            throw new UnableToSavePhotoException();
        }
    }


    public Image createOrganization(MultipartFile file, String organizationName) throws UnableToSavePhotoException {
        try {
            String extention = "." + file.getContentType().split("/")[1];

            if (!DIRECTORY.exists()) {
                DIRECTORY.mkdirs();
            }

            File orgImg = new File(DIRECTORY + "\\" + organizationName + extention);
            orgImg.createNewFile();
            file.transferTo(orgImg);

            String imageURL = URL + orgImg.getName();

            Image i = new Image(orgImg.getName(), file.getContentType(), orgImg.getPath(), imageURL);
            return imageRepository.save(i);

        } catch (IOException e) {
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
}
