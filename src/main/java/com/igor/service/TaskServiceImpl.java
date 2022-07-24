package com.igor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.enums.Status;
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
	       List<Task> teams = repository.findAllTasksForUserId(id);
	        return teams;
	    }
	  public List<Task> findTasksForUserName(String username) {
	       List<Task> teams = repository.findAllTasksForUserName(username);
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
	    	Task t = repository.findById(id).get();
	    	if(task.getName()!=null)t.setName(task.getName());
	    	if(task.getDescription()!=null)t.setDescription(task.getDescription());
	    	if(task.getEst_dur()!=0)t.setEst_dur(task.getEst_dur());
	    	if(task.getPriority()!=null)t.setPriority(task.getPriority());
	    	if(task.getReporter()!=0)t.setReporter(task.getReporter());
	    	if(task.getStatus()!=null)t.setStatus(task.getStatus());
	    	if(task.getTeam()!=0)t.setTeam(task.getTeam());
	    	return repository.save(task);
	    }
	  
	    @Override
	    public Task changeTaskStatus(Long id, String status) {
	    	Task task = repository.getById(id);
	    	task.setStatus(Status.valueOf(status));
	    	return repository.save(task);
	    }
	    
	    @Override
	    public void deleteTask(Long id) {
	    	repository.deleteById(id);
	    }

		@Override
		public List<Task> findTasksForTeam(int id) {
			return repository.findTasksForTeam(id);
		}

		
}
