package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.UserReported;
import com.nvd.repositories.UserReportedRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserReportedService {

    private final UserReportedRepository userReportedRepository;

    public boolean checkExistReport(ApplicationUser reportedUser, ApplicationUser userSendReport) {
        return userReportedRepository.existsByReportedUserAndUserSendReport(reportedUser, userSendReport);
    }

    @Transactional
    public void saveReport(UserReported userReported) {
        userReportedRepository.save(userReported);
    }

}
