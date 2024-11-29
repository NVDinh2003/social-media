package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.models.PostReported;
import com.nvd.repositories.PostReportedRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostReportedService {

    private final PostReportedRepository postReportedRepository;

    Calendar now = Calendar.getInstance();
    int year = now.get(Calendar.YEAR);


    public boolean checkExistReport(Post post, ApplicationUser userSendReport) {
        return postReportedRepository.existsByReportedPostAndUserSendReport(post, userSendReport);
    }

    @Transactional
    public void saveReport(PostReported postReported) {
        postReportedRepository.save(postReported);
    }

    public List<Object[]> getAllPostReportedByDay(int day, int month) {
        return postReportedRepository.getAllPostReportedByDay(day, month, year);
    }

    public List<Object[]> getAllPostReportedByYear(int year) {
        return postReportedRepository.getAllPostReportedByYear(year);
    }

    public List<PostReported> getAllPostReported() {
        return postReportedRepository.findAll();
    }

    public List<PostReported> getAllPostReportedById(int id) {

        return postReportedRepository.getAllPostReportedById(id);
    }

    public int getTotalPostReportedByDay(int day, int month) {
        return postReportedRepository.getTotalPostReportedByDay(day, month, year);
    }


    public int getTotalPostReportedByMonth(int month) {
        return postReportedRepository.getTotalPostReportedByMonth(month, year);
    }


    public int getTotalPostReportedByYear(int year) {
        return postReportedRepository.getTotalPostReportedByYear(year);
    }


    public void disable(PostReported postReported) {

        postReportedRepository.delete(postReported);
    }
}
