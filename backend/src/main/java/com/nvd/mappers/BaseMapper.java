package com.nvd.mappers;

import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.Optional;

public interface BaseMapper<E, DTO> {

    DTO convertToDTO(E entity);

    E convertToEntity(DTO dto);


    List<DTO> convertListToDTO(List<E> listE);

    List<E> convertListToEntity(List<DTO> dtoList);

    Optional<DTO> convertOptional(Optional<E> optionalE);

    // ánh xạ dữ liệu từ DTO vào entity này
    E updateEntity(DTO dto, @MappingTarget E entity);

}