//package com.nvd.service;
//
//import com.nvd.models.ApplicationUser;
//import com.nvd.models.Message;
//import com.nvd.models.MessageReaction;
//import com.nvd.repositories.MessageReactionRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Optional;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class MessageReactionService {
//    private final MessageReactionRepository reactionRepository;
//
//    public MessageReaction createOrDeleteReaction(ApplicationUser user, String reaction, Message message) {
//        Optional<MessageReaction> reactionOptional = reactionRepository.findByReactionUserAndReactionAndMessage(
//                user, reaction, message
//        );
//
//        if (reactionOptional.isEmpty()) {
//            MessageReaction messageReaction = MessageReaction.builder()
//                    .reactionUser(user)
//                    .reaction(reaction)
//                    .message(message)
//                    .build();
//            return reactionRepository.save(messageReaction);
//        } else {
//            MessageReaction messageReaction = reactionOptional.get();
//            reactionRepository.delete(messageReaction);
//            return messageReaction;
//        }
//    }
//
//    public boolean reactionExists(ApplicationUser user, String reaction, Message message) {
//        return reactionRepository.findByReactionUserAndReactionAndMessage(user, reaction, message).isPresent();
//    }
//}
