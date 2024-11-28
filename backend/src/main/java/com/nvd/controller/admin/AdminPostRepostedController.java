package com.nvd.controller.admin;

import com.nvd.service.PostReportedService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
@RolesAllowed("ADMIN")
public class AdminPostRepostedController {
    private PostReportedService postReportedService;


}
