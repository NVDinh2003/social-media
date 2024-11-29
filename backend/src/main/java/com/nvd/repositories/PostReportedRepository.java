package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.models.PostReported;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostReportedRepository extends JpaRepository<PostReported, Integer> {

    boolean existsByReportedPostAndUserSendReport(Post reportedPost, ApplicationUser userSendReport);

    @Query(value = "SELECT post_reported_id, count(post_reported_id) FROM post_reported WHERE EXTRACT(DAY FROM date_report)=:day AND EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year GROUP BY post_reported_id;", nativeQuery = true)
    List<Object[]> getAllPostReportedByDay(int day, int month, int year);

    @Query(value = "SELECT post_reported_id, count(post_reported_id) FROM post_reported WHERE EXTRACT(YEAR FROM date_report)=:year GROUP BY post_reported_id;", nativeQuery = true)
    List<Object[]> getAllPostReportedByYear(int year);

    @Query(value = "SELECT * FROM post_reported WHERE post_reported_id=:id", nativeQuery = true)
    List<PostReported> getAllPostReportedById(int id);

    // lấy tổng số bài đăng theo ngày
    @Query(value = "SELECT COUNT(id) FROM post_reported WHERE EXTRACT(DAY FROM date_report)=:day AND EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
    int getTotalPostReportedByDay(int day, int month, int year);

    // lấy tổng số bài đăng theo tháng
    @Query(value = "SELECT COUNT(id) FROM post_reported WHERE EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
    int getTotalPostReportedByMonth(int month, int year);

    //lấy tổng số bài đăng theo năm
    @Query(value = "SELECT COUNT(id) FROM post_reported WHERE EXTRACT(YEAR FROM date_report)=:year", nativeQuery = true)
    int getTotalPostReportedByYear(int year);
}
