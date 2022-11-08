package com.igor.service;

import java.util.List;

import com.igor.models.Task;


public interface TaskService {
	
	List<Task> findAll();

	List<Task> findTasksForUser(int id);
	
	List<Task> findTasksForUserName (String username);
	
	void addTask(Task task);

	Task getTask(Long id);

	Task updateTask(Long id, Task task);
	
	Task changeTaskStatus(Long id, String status);

	void deleteTask(Long id);
	
	List<Task> findTasksForTeam(int id);
	
	

}
