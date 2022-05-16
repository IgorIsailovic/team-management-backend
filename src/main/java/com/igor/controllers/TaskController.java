package com.igor.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/")
public class TaskController {
	
	

	@Autowired
	private TaskServiceImpl taskService;
	
	@GetMapping("tasks")
	public List<Task> getAllTasks(){
		return taskService.findAll();
	}
	@GetMapping("tasks/test/{id}")
	public List<Task> getAllTasksTest(@PathVariable int id){
		return taskService.findTasksForUser(id);
	}
	@GetMapping("tasks/test1/{username}")
	public List<Task> getAllTasksTest1(@PathVariable String username){
		return taskService.findTasksForUser1(username);
	}
	 @GetMapping("tasks/{id}")
	    public ResponseEntity<Task> getETaskById(@PathVariable Long id) {
	        Task task = taskService.getTask(id);
	        return ResponseEntity.ok().body(task);
	    }
	
	 @PostMapping("tasks")
	    public ResponseEntity<String> addTask(@RequestBody Task task) {
	        taskService.addTask(task);
	        return ResponseEntity.ok().body("Succesffuly added task!");
	    }
	 
	 @PutMapping("tasks/{id}")
	    public ResponseEntity<String> updateTask(@RequestBody Task task, @PathVariable Long id) {
	        taskService.updateTask(id, task);
	        return ResponseEntity.ok().body("Succesffuly updated task!");
	    }
	 
	 @DeleteMapping("tasks/{id}")
	    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
	        taskService.deleteTask(id);
	        return ResponseEntity.ok().body("Succesffuly deleted task!");
	    }

}
