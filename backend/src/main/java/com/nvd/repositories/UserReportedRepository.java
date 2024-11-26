package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.UserReported;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserReportedRepository extends JpaRepository<UserReported, Integer> {

    boolean existsByReportedUserAndUserSendReport(ApplicationUser reportedUser, ApplicationUser userSendReport);

    @Query(value = "   SELECT ur.user_reported_id , COUNT(ur.id) as CountReport FROM user_reported ur\n" +
            "            WHERE EXTRACT(DAY FROM date_report)=:day \n" +
            "            AND EXTRACT(MONTH FROM date_report)=:month \n" +
            "            AND EXTRACT(YEAR FROM date_report)=:year \n" +
            "            group by ur.user_reported_id \n" +
            "            order by CountReport DESC;"
            , nativeQuery = true)
    List<Object[]> getAllUserReportedByDay(int day, int month, int year);

    @Query(value = "   SELECT ur.user_reported_id , COUNT(ur.id) as CountReport FROM user_reported ur\n" +
            "            WHERE EXTRACT(YEAR FROM date_report)=:year \n" +
            "            group by ur.user_reported_id \n" +
            "            order by CountReport DESC;"
            , nativeQuery = true)
    List<Object[]> getAllUserReportedByYear(int year);

    @Query(value = "SELECT COUNT(ur.user_reported_id) FROM user_reported ur WHERE EXTRACT(YEAR FROM date_report)=:year;", nativeQuery = true)
    int getTotalUserReportedByYear(int year);

    @Query(value = "SELECT COUNT(ur.user_reported_id) FROM user_reported ur WHERE " +
            "EXTRACT(MONTH FROM date_report)=:month AND EXTRACT(YEAR FROM date_report)=:year;", nativeQuery = true)
    int getTotalUserReportedByMonth(int month, int year);

    @Query(value = "SELECT COUNT(ur.user_reported_id) FROM user_reported ur WHERE " +
            "EXTRACT(DAY FROM date_report)=:day AND EXTRACT(MONTH FROM date_report)=:month AND " +
            "EXTRACT(YEAR FROM date_report)=:year;", nativeQuery = true)
    int getTotalUserReportedByDay(int day, int month, int year);
}