package com.igor.service;

import java.util.List;

import com.igor.models.Task;
import com.igor.models.Team;

public interface TaskService {
	
	List<Task> findAll();

	void addTask(Task task);

	Task getTask(Long id);

	Task updateTask(Long id, Task task);

	void deleteTask(Long id);
	
	List<Task> findTasksForTeam(String team);
	
	

}
