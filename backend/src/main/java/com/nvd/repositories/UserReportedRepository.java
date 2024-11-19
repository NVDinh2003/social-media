package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.UserReported;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserReportedRepository extends JpaRepository<UserReported, Integer> {
    
    boolean existsByReportedUserAndUserSendReport(ApplicationUser reportedUser, ApplicationUser userSendReport);
}