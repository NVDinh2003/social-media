package com.nvd.models.cache;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlockSpam implements Serializable {
    Long currenTime;
    Integer countRequest;
}