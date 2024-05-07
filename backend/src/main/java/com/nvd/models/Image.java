package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long imageId;
    @Column(unique = true)
    private String imageName;
    private String imageType;
    @JsonIgnore
    private String imagePath;
    @Column(name = "image_url")
    private String imageURL;

    public Image(String imageName, String imageType, String imagePath, String imageURL) {
        super();
        this.imageName = imageName;
        this.imageType = imageType;
        this.imagePath = imagePath;
        this.imageURL = imageURL;
    }
}
