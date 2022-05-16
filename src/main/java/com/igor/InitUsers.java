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
		Optional<Role> role = userService.addRole("ROLE_ADMIN", "Admin role");
		LOGGER.debug("Role ROLE_ADMIN created? " + (role.isPresent() ? role.get().getRoleName() : "Nije"));
		
		
		Optional<Role> role2 = userService.addRole("ROLE_USER", "User role");
		LOGGER.debug("Role ROLE_USER created? " + (role2.isPresent() ?
		role2.get().getRoleName(): "Nije"));
		 
		
		
		Optional<User> user1 = userService.addAdmin("milan","Sps.7009", "Milan", "Nikolic", "milan.nikolic@nbs.rs");
		if (user1.isPresent()) {
			
			LOGGER.debug("User:" + user1.get().getId() + "/" + user1.get().getUsername() + "/" + user1.get().getPassword() + " created");
			LOGGER.debug(user1.get().getRoles().toString());
			
		}
		
		  Optional<User> user2 = userService.addAdmin("nikola","Test.7032", "Nikola", "Čeković", "nikola.cekovic@nbs.rs"); 
		  if (user2.isPresent()) {
			  LOGGER.debug("User:" + user2.get().getId() + "/" + user2.get().getUsername()
			  + "/" + user2.get().getPassword() + " created");
			  LOGGER.debug(user2.get().getRoles().toString());
		  }
		 
		  Optional<User> user3 = userService.addAdmin("igor","Test.7020", "Igor", "Isailović", "igor.isailovic@nbs.rs"); 
		  if (user3.isPresent()) {
			  LOGGER.debug("User:" + user3.get().getId() + "/" + user3.get().getUsername()
			  + "/" + user3.get().getPassword() + " created");
			  LOGGER.debug(user3.get().getRoles().toString());
		  }
		
	}

}
