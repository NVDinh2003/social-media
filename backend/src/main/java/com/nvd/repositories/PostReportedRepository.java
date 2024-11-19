package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.models.PostReported;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostReportedRepository extends JpaRepository<PostReported, Integer> {

    boolean existsByReportedPostAndUserSendReport(Post reportedPost, ApplicationUser userSendReport);
}
