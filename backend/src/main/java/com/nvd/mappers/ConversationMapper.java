package com.nvd.mappers;

import com.nvd.dto.response.ConversationDTO;
import com.nvd.models.Conversation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ConversationMapper extends BaseMapper<Conversation, ConversationDTO> {
    @Override
    @Mapping(target = "conversationMessage", source = "conversationMessage")
    ConversationDTO convertToDTO(Conversation entity);

    @Override
    @Mapping(target = "conversationMessage", source = "conversationMessage")
    Conversation convertToEntity(ConversationDTO dto);
}