package com.igor.service;

import java.util.List;
import java.util.Optional;

import com.igor.models.Role;
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

	Optional<User> addTeamLeader(String username, String password, String firstName, String lastName, String email);

	Optional<Role> addRole(String roleName, String roleDesc);
	
	Optional<User> signup(String username, String password, String firstName, String lastName, String email);

}
