package com.igor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.igor.models.Task;
import com.igor.models.Team;
import com.igor.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String userName);
    
    @Query(
			  value = "INSERT INTO team_user (team_id, user_id) VALUES (:user_id,:team_id)", 
			  nativeQuery = true)
	List<User> addUserToTeam(@Param("user_id")long user_id, @Param("team_id")long team_id);
    
}