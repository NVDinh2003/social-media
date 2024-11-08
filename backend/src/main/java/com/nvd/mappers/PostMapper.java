package com.nvd.mappers;

// đặt trên 1 interface để tạo 1 lớp Mapper tương ứng,

import com.nvd.dto.response.PostDTO;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

// đặt trên 1 interface để tạo 1 lớp Mapper tương ứng,
@Mapper(componentModel = "spring", // tạo ra dưới dạng 1 bean trong spring
        // thuộc tính obj nguồn = null, thì thuộc tính obj đích = gt hiện tại or null
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//        uses = {ApplicationUserMapper.class, ImageMapper.class, PollMapper.class})
public interface PostMapper extends BaseMapper<Post, PostDTO> {
    PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

    @Override
    @InheritInverseConfiguration // tự động tạo các ánh xạ ngược lại từ DTO sang entity.
    // nhưng DTO chỉ chứa code cho province, district, ward, nên ignore ánh xạ fields khi chuyển từ DTO sang entity.
    @Mapping(target = "province", ignore = true)
    @Mapping(target = "district", ignore = true)
    @Mapping(target = "ward", ignore = true)
    @Mapping(target = "views", expression = "java(mapIdsToViews(dto.getViews()))")
    Post convertToEntity(PostDTO dto);

    @Override
    @Mapping(target = "provinceCode", source = "province.code")
    @Mapping(target = "districtCode", source = "district.code")
    @Mapping(target = "wardCode", source = "ward.code")
    @Mapping(target = "views", expression = "java(mapViewsToIds(entity.getViews()))")
    PostDTO convertToDTO(Post entity);

    default Set<Integer> mapViewsToIds(Set<ApplicationUser> views) {
        return views.stream().map(ApplicationUser::getUserId).collect(Collectors.toSet());
    }

    default Set<ApplicationUser> mapIdsToViews(Set<Integer> ids) {
        return ids.stream().map(id -> {
            ApplicationUser user = new ApplicationUser();
            user.setUserId(id);
            return user;
        }).collect(Collectors.toSet());
    }

    @Override
    default Optional<PostDTO> convertOptional(Optional<Post> user) {
        return user.map(this::convertToDTO);
    }
}
