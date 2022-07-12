package com.igor.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.igor.models.Team;
import com.igor.models.User;

public interface UserService {
	
	
	
	List<User> findUsersForTeam(String team);
	
	List<User> findUsersForTask(int id);

	void addUserToTeam(long user_id, long team_id);
	
	void addUserToTask(long user_id, long task_id);
	
 boolean checkUserToTeam(long user_id, long team_id);
		
	

}
