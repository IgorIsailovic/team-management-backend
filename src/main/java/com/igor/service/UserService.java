package com.igor.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.igor.models.Team;
import com.igor.models.User;

public interface UserService {
	
	List<User> getAll();
	
	User getUserById(long id);
	
	List<User> findUsersForTeam(int id);
	
	List<User> findUsersForTask(int id);
	
	String deleteUser(String username);

	void addUserToTeam(long user_id, long team_id);
	
	void addUserToTask(long user_id, long task_id);
	
 boolean checkUserToTeam(long user_id, long team_id);
		
 boolean checkUserToTask(long user_id, long task_id);
 
 User updateUser(Long id, String password);



 
}
