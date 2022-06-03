package com.igor.service;

import java.util.List;

import com.igor.models.Team;
import com.igor.models.User;

public interface UserService {
	
	List<User> findUsersForTeam(String team);
	

}
