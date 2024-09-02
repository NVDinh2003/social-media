package com.nvd.repositories;

import com.nvd.models.PollChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollChoiceRepository extends JpaRepository<PollChoice, Integer> {
}
