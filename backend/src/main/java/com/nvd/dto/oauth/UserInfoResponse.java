package com.nvd.dto.oauth;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserInfoResponse {
    String email;
    String name;
    String picture; // URL ảnh profile nếu cần
}