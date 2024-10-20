package com.nvd.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedRequestDTO {
    private Integer userId;
    private LocalDateTime sessionStart;
    private Integer page;
}
