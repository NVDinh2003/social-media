package com.nvd.service;

import com.nvd.repositories.PostReportedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostReportedService {

    private final PostReportedRepository postReportedRepository;


    public boolean checkExistReport(String post_reported_id, String user_send_report_id) {


//        if (postReported != null) {
//            System.out.println("Ban da bao cao roi");
//            return true;
//        } else {
//            return false;
//        }
    }
}
