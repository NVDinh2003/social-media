package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.models.PostReported;
import com.nvd.repositories.PostReportedRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostReportedService {

    private final PostReportedRepository postReportedRepository;

    public boolean checkExistReport(Post post, ApplicationUser userSendReport) {
        return postReportedRepository.existsByReportedPostAndUserSendReport(post, userSendReport);
    }

    @Transactional
    public void saveReport(PostReported postReported) {
        postReportedRepository.save(postReported);
    }
}
