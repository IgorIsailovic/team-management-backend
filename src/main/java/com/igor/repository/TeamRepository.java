package com.igor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.igor.models.Role;
import com.igor.models.Team;

public interface TeamRepository extends JpaRepository<Team, Long>{

//	List<Team> findAll();
	
	 @Query(
			  value = "SELECT * FROM team t JOIN team_user tu ON t.id = tu.team_id JOIN security_user su ON su.id = tu.user_id WHERE su.username=:username", 
			  nativeQuery = true)
	List<Team> findAllUserTeams(@Param("username")String username);

	    Team findByName(String name);

	    @Query(
				  value = "SELECT * FROM team t JOIN team_user tu ON t.id = tu.team_id JOIN security_user su ON su.id = tu.user_id JOIN task_user tau ON tau.user_id=su.id JOIN task tas ON tas.id=tau.task_id WHERE t.name=:name", 
				  nativeQuery = true)
		List<Team> findAllDataTeam(@Param("name")String name);
	    
	    
}
