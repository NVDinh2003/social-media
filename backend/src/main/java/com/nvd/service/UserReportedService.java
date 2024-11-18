package com.nvd.service;

import com.nvd.repositories.UserReportedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserReportedService {

    private final UserReportedRepository userReportedRepository;

    
}
