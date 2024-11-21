package com.nvd.mappers;

import com.nvd.dto.response.MessageDTO;
import com.nvd.models.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", // tạo ra dưới dạng 1 bean trong spring
        // thuộc tính obj nguồn = null, thì thuộc tính obj đích = gt hiện tại or null
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//        uses = {ApplicationUserMapper.class, ImageMapper.class, PollMapper.class})
public interface MessageMapper extends BaseMapper<Message, MessageDTO> {
    @Override
    @Mapping(target = "conversationId", source = "conversation.conversationId")
    @Mapping(target = "reactions", source = "reactions")
    MessageDTO convertToDTO(Message entity);

    @Override
    @Mapping(target = "conversation", ignore = true)
    Message convertToEntity(MessageDTO dto);
}
