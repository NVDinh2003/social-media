package com.nvd.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FetchFeedResponseDTO {
    private Integer page;
    private LocalDateTime sessionStart;
    private List<FeedPostDTO> posts;
}
