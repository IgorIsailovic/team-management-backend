package com.igor.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.igor.models.Team;
import com.igor.models.User;

public interface UserService {
	
	List<User> findUsersForTeam(String team);
	
	List<User> findUsersForTask(int id);

}
