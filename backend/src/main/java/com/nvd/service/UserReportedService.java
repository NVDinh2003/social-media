package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.UserReported;
import com.nvd.repositories.UserReportedRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserReportedService {

    private final UserReportedRepository userReportedRepository;

    private final int year = Year.now().getValue();

    public boolean checkExistReport(ApplicationUser reportedUser, ApplicationUser userSendReport) {
        return userReportedRepository.existsByReportedUserAndUserSendReport(reportedUser, userSendReport);
    }

    @Transactional
    public void saveReport(UserReported userReported) {
        userReportedRepository.save(userReported);
    }


    public List<Object[]> getAllUserReportedByDay(int day, int month) {
        return userReportedRepository.getAllUserReportedByDay(day, month, year);
    }

    public List<Object[]> getAllUserReportedByYear(int year) {
        return userReportedRepository.getAllUserReportedByYear(year);
    }

    public int getTotalUserReportedByYear(int year) {
        return userReportedRepository.getTotalUserReportedByYear(year);
    }

    public int getTotalUserReportedByMonth(int month) {
        return userReportedRepository.getTotalUserReportedByMonth(month, year);
    }

    public int getTotalUserReportedByDay(int day, int month) {
        return userReportedRepository.getTotalUserReportedByDay(day, month, year);
    }
}
