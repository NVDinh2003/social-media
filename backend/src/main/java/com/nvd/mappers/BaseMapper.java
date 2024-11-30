package com.nvd.mappers;

import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface BaseMapper<E, DTO> {

    DTO convertToDTO(E entity);

    E convertToEntity(DTO dto);

    default Page<DTO> convertPageToDTO(Page<E> pageE) {
        return pageE.map(this::convertToDTO);
    }

    List<DTO> convertListToDTO(List<E> listE);

    List<E> convertListToEntity(List<DTO> dtoList);

    default Optional<DTO> convertOptional(Optional<E> optionalE) {
        return optionalE.map(this::convertToDTO);
    }

    // ánh xạ dữ liệu từ DTO vào entity này
    E updateEntity(DTO dto, @MappingTarget E entity);


}