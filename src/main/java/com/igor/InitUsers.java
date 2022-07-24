package com.igor;


import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.igor.models.Role;
import com.igor.models.User;
import com.igor.service.UserServiceImpl;



@Component
public class InitUsers implements ApplicationRunner {
	private static Logger LOGGER = LoggerFactory.getLogger(InitUsers.class);
	@Autowired
	com.igor.repository.UserRepository userRepository;
	@Autowired
	com.igor.repository.RoleRepository roleRepository;
	@Autowired
	UserServiceImpl userService;
	@Override
	public void run(ApplicationArguments args) throws Exception {
		Optional<Role> role = userService.addRole("Team Leader", "Team Leader role");
		LOGGER.debug("Role ROLE Team Leader created? " + (role.isPresent() ? role.get().getRoleName() : "Nije"));
		
		
		Optional<Role> role2 = userService.addRole("User", "User role");
		LOGGER.debug("Role ROLE_USER created? " + (role2.isPresent() ?
		role2.get().getRoleName(): "Nije"));
		 
	
		
		
		Optional<User> user1 = userService.addTeamLeader("max","Max123!", "Max", "Smith", "max.smith@gmail.com");
		if (user1.isPresent()) {
			
			LOGGER.debug("User:" + user1.get().getId() + "/" + user1.get().getUsername() + "/" + user1.get().getPassword() + " created");
			LOGGER.debug(user1.get().getRoles().toString());
			
		}
		
		  Optional<User> user2 = userService.addTeamLeader("lynda","Lynda123!", "Lynda", "Vasquez", "lynda.vasquez@gmail.com"); 
		  if (user2.isPresent()) {
			  LOGGER.debug("User:" + user2.get().getId() + "/" + user2.get().getUsername()
			  + "/" + user2.get().getPassword() + " created");
			  LOGGER.debug(user2.get().getRoles().toString());
		  }
		 
		
	}

}
