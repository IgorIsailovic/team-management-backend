package com.igor.controllers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import com.igor.models.Task;
import com.igor.models.Team;
import com.igor.models.User;
import com.igor.web.LoginDto;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    
    public UserController(com.igor.service.UserServiceImpl userService) {
    	this.userService = userService;
	}

    private com.igor.service.UserServiceImpl userService;
    
    
   

    @CrossOrigin
    @PostMapping("/signin")
    public String login(@RequestBody LoginDto loginDto) {
    	LOGGER.info("User try to login!" + loginDto.getUsername() + "/" + loginDto.getPassword());
       String s =  userService.signin(loginDto.getUsername(), loginDto.getPassword()).orElseThrow(()->
               new HttpServerErrorException(HttpStatus.FORBIDDEN, "Login Failed"));
       LOGGER.info("Sistem vraća " + s);
       return s;
    }

    @PostMapping("/signup")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin
    public User signup(@RequestBody LoginDto loginDto){
        return userService.signup(loginDto.getUsername(), loginDto.getPassword(), loginDto.getFirstName(),
                loginDto.getLastName(),loginDto.getEmail()).orElseThrow(() -> new HttpServerErrorException(HttpStatus.BAD_REQUEST,"User already exists"));
    }

    @GetMapping("getOne/{id}")
    public ResponseEntity<User> getTeamById(@PathVariable long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok().body(user);
    } 
    
    @GetMapping("getByName/{name}")
    public ResponseEntity<Optional<User>> getTeamByName(@PathVariable String name) {
        Optional<User> user = userService.getUserByName(name);
        return ResponseEntity.ok().body(user);
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @CrossOrigin
    public List<User> getAllUsers() {
        return userService.getAll();
    }
     
    @DeleteMapping("/delete/{username}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
    public String addUserToTeam(@PathVariable Long user_id, @PathVariable Long team_id) {
        List<User> user = userService.addUserToteam(user_id, team_id);
        return "Ok";
    }
}