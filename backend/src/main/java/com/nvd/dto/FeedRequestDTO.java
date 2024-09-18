package com.nvd.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedRequestDTO {
    private Integer userId;
    private Date sessionStart;
    private Integer page;
}
