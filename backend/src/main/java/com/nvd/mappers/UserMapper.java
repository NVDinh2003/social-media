package com.nvd.mappers;

import com.nvd.dto.request.UserUpdateDTO;
import com.nvd.models.ApplicationUser;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper extends BaseMapper<ApplicationUser, UserUpdateDTO> {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

}