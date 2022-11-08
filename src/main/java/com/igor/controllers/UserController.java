package com.igor.controllers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import com.igor.models.User;
import com.igor.web.LoginDto;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    
    public UserController(com.igor.service.UserServiceImpl userService) {
    	this.userService = userService;
	}

    private com.igor.service.UserServiceImpl userService;
    
    
   

   // @CrossOrigin
    @PostMapping("/signin")
    public String login(@RequestBody LoginDto loginDto) {
    	LOGGER.info("User try to login!" + loginDto.getUsername() + "/" + loginDto.getPassword());
       String s =  userService.signin(loginDto.getUsername(), loginDto.getPassword()).orElseThrow(()->
               new HttpServerErrorException(HttpStatus.FORBIDDEN, "Login Failed"));
       LOGGER.info("Sistem vraća " + s);
       return s;
    }

    @PostMapping("/signup")
    @PreAuthorize("hasRole('ROLE_Team Leader')")
    @ResponseStatus(HttpStatus.CREATED)
   // @CrossOrigin
    public User signup(@RequestBody LoginDto loginDto){
        return userService.signup(loginDto.getUsername(), loginDto.getPassword(), loginDto.getFirstName(),
                loginDto.getLastName(),loginDto.getEmail()).orElseThrow(() -> new HttpServerErrorException(HttpStatus.BAD_REQUEST,"User already exists"));
    }

    @GetMapping("getOne/{id}")
    public ResponseEntity<User> getTeamById(@PathVariable long id) {
    	try {
        User user = userService.getUserById(id);
        return ResponseEntity.ok().body(user);
    	}
    	catch (Exception e) {
    		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}
    } 
    @GetMapping("getByName/{name}")
    public ResponseEntity<Optional<User>> getTeamByName(@PathVariable String name) {
    	try {
        Optional<User> user = userService.getUserByName(name);
         if(!user.isPresent()) {
        	 return new ResponseEntity<Optional<User>>(HttpStatus.BAD_REQUEST);
        	
         }
         else 
        	 return ResponseEntity.ok().body(user);
         
    	}
    	catch (Exception e) {
    		return new ResponseEntity<Optional<User>>(HttpStatus.BAD_REQUEST);
		}
    
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ROLE_Team Leader')")
    public List<User> getAllUsers() {
        return userService.getAll();
    }
    @DeleteMapping("/delete/{username}")
    @PreAuthorize("hasRole('ROLE_Team Leader')")
    public ResponseEntity<String> deleteUser(@PathVariable("username") String username) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		if (currentPrincipalName.equals(username)) {
			return new ResponseEntity<>("Can't delete your self!",HttpStatus.BAD_REQUEST);//(HttpStatus.BAD_REQUEST, "Can't delete your self!");
		}
		if (userService.deleteUser(username).equals("OK"))
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{user_id}/{team_id}")
    public ResponseEntity<String> addUserToTeam(@PathVariable long user_id, @PathVariable long team_id) {
    	
    	if(userService.checkUserToTeam(user_id, team_id)) {
    		return new ResponseEntity<>("User is already part of this team!" ,HttpStatus.BAD_REQUEST);
    	}
    	else { 
    		try {
    		userService.addUserToTeam(user_id, team_id);
    		return new ResponseEntity<>("Successfully added user to the team!" ,HttpStatus.OK);
    		}
    		catch (Exception e) {
        		return new ResponseEntity<>("Unsuccessfull, user was not added to the team!" ,HttpStatus.BAD_REQUEST);
			}
    	}
    	}

    @GetMapping("/addUserToTask/{user_id}/{task_id}")
    public ResponseEntity<String> addUserToTask(@PathVariable long user_id, @PathVariable long task_id) {
    	
    	if(userService.checkUserToTask(user_id, task_id)) {
    		return new ResponseEntity<>("This task was already assigned to this user!" ,HttpStatus.BAD_REQUEST);
    	}
    	else { 
    		try {
    		userService.addUserToTask(user_id, task_id);
    		return new ResponseEntity<>("Successfully assigned the task to the user!" ,HttpStatus.OK);
    		}
    		catch (Exception e) {
        		return new ResponseEntity<>("Unsuccessfull, the task was not assigned to the user!" ,HttpStatus.BAD_REQUEST);
			}
    	}
    	}
    
    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<String> updateUser(@RequestBody String password, @PathVariable Long id) {
    	try {
        userService.updateUser(id, password);
        return ResponseEntity.ok().body("Succesffuly updated user!");
    	}
    	catch (Exception e) {
    		return new ResponseEntity<>("Unsuccessfull, user was not updated!" ,HttpStatus.BAD_REQUEST);
		}
    }
    @GetMapping("/getUsersForTeam/{id}")
	 public List<User> getUsersForTeam(@PathVariable int id) {
	        return userService.findUsersForTeam(id);
	        
	    }
    @GetMapping("/getUsersForTask/{id}")
  	 public List<User> getUsersForTask(@PathVariable int id) {
  	        return userService.findUsersForTask(id);
  	        
  	    }
}