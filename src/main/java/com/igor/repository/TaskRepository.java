package com.igor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.igor.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{


	@Query(
			  value = "SELECT * FROM task t\r\n"
			  		+ "JOIN task_user tu ON t.id = tu.task_id\r\n"
			  		+ "JOIN security_user s ON s.id = tu.user_id\r\n"
			  		+ "WHERE tu.user_id=:id", 
			  nativeQuery = true)
	List<Task> findAllTasksForUserId(@Param("id")int id);
	
	@Query(
			  value = "SELECT * FROM task t\r\n"
			  		+ "JOIN task_user tu ON t.id = tu.task_id\r\n"
			  		+ "JOIN security_user s ON s.id = tu.user_id\r\n"
			  		+ "WHERE s.username=:username", 
			  nativeQuery = true)
	List<Task> findAllTasksForUserName(@Param("username")String username);

	@Query(
			  value = "SELECT * FROM task t\r\n"
			  		+ "JOIN team te ON t.team = te.id\r\n"
			  		+ "WHERE te.id=:id", 
			  nativeQuery = true)
	List<Task> findTasksForTeam(@Param("id")int id);

	
}
