package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NofiticationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> getByRecipientAndAcknowledgedFalse(ApplicationUser recipient);
}
