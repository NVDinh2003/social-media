package com.nvd.dto.response.cloud;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CloudinaryResponse {

    private String publicId;
    private String url;
}