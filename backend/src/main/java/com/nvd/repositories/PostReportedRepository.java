package com.nvd.repositories;

import com.nvd.models.PostReported;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostReportedRepository extends JpaRepository<PostReported, Integer> {
}
