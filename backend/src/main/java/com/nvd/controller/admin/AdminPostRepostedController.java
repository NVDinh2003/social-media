package com.nvd.controller.admin;

import com.nvd.dto.admin.PostReportedDetail;
import com.nvd.models.Post;
import com.nvd.models.PostReported;
import com.nvd.service.PostReportedService;
import com.nvd.service.PostService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
@RolesAllowed("ADMIN")
public class AdminPostRepostedController {
    private final PostReportedService postReportedService;
    private final PostService postService;


    Calendar now = Calendar.getInstance();
    int month = now.get(Calendar.MONTH) + 1;

    // 6-11
    @GetMapping("/list-post-reported-by-day")
    public ResponseEntity<List<PostReportedDetail>> getListPostReportedByDay() {
        try {
            int day = now.get(Calendar.DAY_OF_MONTH);
            List<Object[]> list = postReportedService.getAllPostReportedByDay(day, month);

            return ResponseEntity.status(200).body(setListPostReportedDetail(list));
        } catch (Exception e) {
            System.out.println("Error at admin/list-post-reported-by-day: " + e);
            return ResponseEntity.status(403).body(null);
        }

    }

    // 6-11
    @GetMapping("/list-post-reported-by-year")
    public ResponseEntity<List<PostReportedDetail>> getListPostReportedByYear() {
        try {
            int year = now.get(Calendar.YEAR);
            List<Object[]> list = postReportedService.getAllPostReportedByYear(year);

            return ResponseEntity.status(200).body(setListPostReportedDetail(list));
        } catch (Exception e) {
            System.out.println("Error at admin/getListPostReportedByYear: " + e);
            return ResponseEntity.status(403).body(null);
        }

    }

    // 6-11
    public List<PostReportedDetail> setListPostReportedDetail(List<Object[]> list) {

        List<PostReportedDetail> listPostReportedDetails = new ArrayList<>();

        for (Object[] oj : list) {
            PostReportedDetail postReportedDetail = new PostReportedDetail();
            Post post = postService.getPostEntityById(Integer.valueOf(String.valueOf(oj[0])));
            postReportedDetail.setContent(truncateText(post.getContent()));
            postReportedDetail.setPost_id(post.getPostId());
            postReportedDetail.setPosted_date(post.getPostedDate());
            postReportedDetail.setAuthor(post.getAuthor());
            postReportedDetail.setImages(post.getImages());

            postReportedDetail.setTotal_report(Integer.valueOf(String.valueOf(oj[1])));
            listPostReportedDetails.add(postReportedDetail);
        }

        return listPostReportedDetails;
    }


    public static String truncateText(String text) {
        if (text.length() > 35) {
            return text.substring(0, 35) + "...";
        } else {
            return text;
        }
    }

    // 6-11
    @GetMapping("/list-port-reported")
    public ResponseEntity<List<PostReported>> getListPostReported() {
        try {

            return ResponseEntity.status(200).body(postReportedService.getAllPostReported());
        } catch (Exception e) {
            System.out.println("Error at admin/getListPostReported: " + e);
            return ResponseEntity.status(403).body(null);
        }

    }

    @GetMapping("/total-post/year")
    public int getTotalPostReportedByYear() {
        int year = now.get(Calendar.YEAR);
        return postReportedService.getTotalPostReportedByYear(year);
    }

    @GetMapping("/total-post/month")
    public int getTotalPostReportedByMonth() {

        return postReportedService.getTotalPostReportedByMonth(month);
    }

    @GetMapping("/total-post/day")
    public int getTotalPostReportedByDay() {
        int day = now.get(Calendar.DAY_OF_MONTH);
        return postReportedService.getTotalPostReportedByDay(day, month);
    }

    @GetMapping("/percent-post-reported-increase/year")
    public double getPercentPostReportedYearIncrease() {
        int previousYear = now.get(Calendar.YEAR) - 1;
        int currentYear = now.get(Calendar.YEAR);
        int previousMonthValue = postReportedService.getTotalPostReportedByYear(previousYear);
        int currentMonthValue = postReportedService.getTotalPostReportedByYear(currentYear);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    @GetMapping("/percent-post-reported-increase/month")
    public double getPercentPostReportedMonthIncrease() {
        int previousMonth = now.get(Calendar.MONTH);
        int currentMonth = previousMonth + 1;
        int previousMonthValue = postReportedService.getTotalPostReportedByMonth(previousMonth);
        int currentMonthValue = postReportedService.getTotalPostReportedByMonth(currentMonth);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    @GetMapping("/percent-post-reported-increase/day")
    public double getPercentPostReportedDayIncrease() {
        int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
        int currentDay = now.get(Calendar.DAY_OF_MONTH);
        int month = now.get(Calendar.MONTH) + 1;
        int previousMonthValue = postReportedService.getTotalPostReportedByDay(previousDay, month);
        int currentMonthValue = postReportedService.getTotalPostReportedByDay(currentDay, month);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    public double caculatePercentIncrease(int previousMonthValue, int currentMonthValue) {
        if (currentMonthValue == 0) {
            return 0;
        } else if (previousMonthValue == 0) {
            return 100;
        } else {
            double diff = currentMonthValue - previousMonthValue;
            double percentageIncrease = (diff / previousMonthValue) * 100;
            if (percentageIncrease < 0) {
                return 0;
            } else {
                return percentageIncrease;
            }
        }
    }
}
