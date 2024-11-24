package com.nvd.controller.admin;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RolesAllowed("ADMIN")
class PostStatisticsController {


}
