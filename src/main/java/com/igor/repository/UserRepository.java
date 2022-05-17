package com.igor.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.igor.models.Task;
import com.igor.models.Team;
import com.igor.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String userName);
    
    @Modifying
    @org.springframework.transaction.annotation.Transactional
    @Query(
			  value = "INSERT INTO team_user (user_id, team_id) VALUES (:user_id,:team_id)", 
			  nativeQuery = true)
	void addUserToTeam(@Param("user_id")long user_id, @Param("team_id")long team_id);
    

    @Query(
			  value = "SELECT EXISTS (SELECT * FROM team_user\r\n"
			  		+ "WHERE  user_id=:user_id AND team_id=:team_id  AND NOT EXISTS (\r\n"
			  		+ "	SELECT * FROM team_user tu \r\n"
			  		+ "	JOIN team t on t.id = tu.team_id \r\n"
			  		+ "	JOIN security_user su on su.id = tu.user_id\r\n"
			  		+ "	WHERE t.id=:team_id AND su.id=:user_id)\r\n"
			  		+ ")", 
			  nativeQuery = true)
	boolean checkUserToTeam(@Param("user_id")long user_id, @Param("team_id")long team_id);
  

}