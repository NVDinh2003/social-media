package com.nvd.controller.admin;

import com.nvd.service.UserReportedService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@RolesAllowed("ADMIN")
public class AdminUserRepostedController {

    private final UserReportedService userReportedService;
}
