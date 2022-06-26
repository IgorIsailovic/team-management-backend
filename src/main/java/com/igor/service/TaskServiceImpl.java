package com.igor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.models.Task;
import com.igor.models.Team;
import com.igor.repository.TaskRepository;


@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
    private TaskRepository repository;

	  @Override
	    public List<Task> findAll() {
	       List<Task> teams = repository.findAll();
	        return teams;
	    }
	    
	  public List<Task> findTasksForUser(int id) {
	       List<Task> teams = repository.findAllTasksForUser(id);
	        return teams;
	    }
	  public List<Task> findTasksForUser1(String username) {
	       List<Task> teams = repository.findAllTasksForUser1(username);
	        return teams;
	    }
	    @Override
	    public void addTask(Task task) {
	    	repository.save(task);
	    }
	    
	    @Override
	    public Task getTask(Long id) {
	    	return repository.findById(id).get();
	    }
	    
	    @Override
	    public Task updateTask(Long id, Task task) {
	    	return repository.save(task);
	    }
	    
	    @Override
	    public void deleteTask(Long id) {
	    	repository.deleteById(id);
	    }

		@Override
		public List<Task> findTasksForTeam(String team) {
			return repository.findTasksForTeam(team);
		}

		
}
