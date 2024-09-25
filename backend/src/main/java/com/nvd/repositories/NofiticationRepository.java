package com.nvd.repositories;

import com.nvd.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NofiticationRepository extends JpaRepository<Notification, Integer> {
}
