package com.igor.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igor.exceptions.ResourceNotFoundException;
import com.igor.models.Task;
import com.igor.models.Team;
import com.igor.repository.TaskRepository;
import com.igor.service.TaskServiceImpl;



@RestController
@RequestMapping("/tasks")
public class TaskController {
	
	

	@Autowired
	private TaskServiceImpl taskService;
	
	@GetMapping("")
	public List<Task> getAllTasks(){
		return taskService.findAll();
	}
	@GetMapping("/getTasksById/{id}")
	public List<Task> getAllTasksByID(@PathVariable int id){
		return taskService.findTasksForUser(id);
	}
	@GetMapping("/getTasks/{username}")
	public List<Task> getAllTasksForUser(@PathVariable String username){
		return taskService.findTasksForUserName(username);
	}
	 @GetMapping("/{id}")
	    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
	        Task task = taskService.getTask(id);
	        return ResponseEntity.ok().body(task);
	    }
	
	 @GetMapping("/getTasksForTeam/{id}")
	 public List<Task> getTasksForTeam(@PathVariable int id) {
	        return taskService.findTasksForTeam(id);
	        
	    }
	 
	 @PostMapping("/addTask")
	    public ResponseEntity<Long> addTask(@RequestBody Task task) {
	        taskService.addTask(task);
	        return ResponseEntity.ok().body(task.getId());
	    }
	 
	 @PutMapping("/{id}")
	    public ResponseEntity<String> updateTask(@RequestBody Task task, @PathVariable Long id) {
	        taskService.updateTask(id, task);
	        return ResponseEntity.ok().body("Succesffuly updated task!");
	    }
	
	 @GetMapping("/changeTaskStatus/{id}/{status}")
	    public ResponseEntity<String> changeTaskStatus( @PathVariable Long id, @PathVariable String status) {
	        taskService.changeTaskStatus(id, status);
	        return ResponseEntity.ok().body("Changed Task status!");
	    }
	 
	 @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
	        taskService.deleteTask(id);
	        return ResponseEntity.ok().body("Succesffuly deleted task!");
	    }
	
}
