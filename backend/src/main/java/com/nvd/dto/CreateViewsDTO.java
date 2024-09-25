package com.nvd.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateViewsDTO {
    private List<Integer> ids;

    @Override
    public int hashCode() {
        return Objects.hash(ids);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        CreateViewsDTO other = (CreateViewsDTO) obj;
        return Objects.equals(ids, other.ids);
    }
}
