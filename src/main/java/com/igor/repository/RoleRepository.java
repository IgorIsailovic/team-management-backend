package com.igor.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.igor.models.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(String name);
}
