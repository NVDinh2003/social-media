package com.nvd.repositories;

import com.nvd.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByAuthority(String authority);


    @Query(value = "SELECT ur.role_id FROM user_roles_junction ur WHERE ur.user_id=:userId", nativeQuery = true)
    int findRoleByUserID(Integer userId);
}
