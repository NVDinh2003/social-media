package com.nvd.schedules;

import com.nvd.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class GlobalSchedule {
    private final PostService postService;

    @Scheduled(fixedRate = 60000) // Chạy mỗi phút
    public void processScheduledPosts() {
        log.info("Checking for scheduled posts...");
        postService.publishScheduledPosts();
    }
}
