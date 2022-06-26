package com.igor.service;

import java.util.Optional;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.igor.models.Role;
import com.igor.models.Task;
import com.igor.models.Team;
import com.igor.models.User;
import com.igor.repository.RoleRepository;
import com.igor.repository.UserRepository;
import com.igor.security.JwtProvider;




@Service
public class UserServiceImpl implements UserService {

	 	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

	    private UserRepository userRepository;

	    private AuthenticationManager authenticationManager;

	    private com.igor.repository.RoleRepository roleRepository;

	    private PasswordEncoder passwordEncoder;

	    private JwtProvider jwtProvider;

	    @Autowired
	    public UserServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager,
	                       RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
	        this.userRepository = userRepository;
	        this.authenticationManager = authenticationManager;
	        this.roleRepository = roleRepository;
	        this.passwordEncoder = passwordEncoder;
	        this.jwtProvider = jwtProvider;
	        LOGGER.debug("User service iniciran!");
	    }

	    /**
	     * Sign in a user into the application, with JWT-enabled authentication
	     *
	     * @param username  username
	     * @param password  password
	     * @return Optional of the Java Web Token, empty otherwise
	     */
	    public Optional<String> signin(String username, String password) {
	        
	        Optional<String> token = Optional.empty();
	        Optional<User> user = userRepository.findByUsername(username);
	        if (!user.isPresent()) {
	        	LOGGER.debug("User nije nadje u bazi! " + username);
	        	
	        }
	        if (user.isPresent()) {
	            try {
	            	LOGGER.debug("user " + username + " nadjen u bazi!");
	            	LOGGER.debug("Prosledjen authentication manager-u pass: " + password);
	                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	                token = Optional.of(jwtProvider.createToken(username, user.get().getRoles()));
	                LOGGER.debug("Token iniciran!");
	            } catch (AuthenticationException e){
	            	LOGGER.info(e.getLocalizedMessage());
	                LOGGER.info("Log in failed for user {}", username);
	            }
	        }
	        return token;
	    }

	    /**
	     * Create a new user in the database.
	     *
	     * @param username username
	     * @param password password
	     * @param firstName first name
	     * @param lastName last name
	     * @return Optional of user, empty if the user already exists.
	     */
	    public Optional<User> signup(String username, String password, String firstName, String lastName, String email) {
	        LOGGER.info("New user attempting to add to DB");
	        Optional<User> user = Optional.empty();
	        if (!userRepository.findByUsername(username).isPresent()) {
	            Optional<Role> role = roleRepository.findByRoleName("User");
	            user = Optional.of(userRepository.save(new User(username,
	                            passwordEncoder.encode(password),
	                            role.get(),
	                            firstName,
	                            lastName,
	                            email)));
	        }
	        return user;
	    }
	    
	    public Optional<User> addLeader(String username, String password, String firstName, String lastName, String email) {
	        LOGGER.info("New leader attempting to add to DB");
	        Optional<User> user = Optional.empty();
	        if (!userRepository.findByUsername(username).isPresent()) {
	            Optional<Role> role = roleRepository.findByRoleName("Leader");
	            user = Optional.of(userRepository.save(new User(username,
	                            passwordEncoder.encode(password),
	                            role.get(),
	                            firstName,
	                            lastName,
	                            email)));
	        }
	        return user;
	    }
	    
	    public Optional<User> addAdmin(String username, String password, String firstName, String lastName, String email){
	       LOGGER.info("New admin added");
	        Optional<User> user = Optional.empty();
	        if (!userRepository.findByUsername(username).isPresent()) {
	            Optional<Role> role = roleRepository.findByRoleName("Admin");
	            user = Optional.of(userRepository.save(new User(username,
	                            passwordEncoder.encode(password),
	                            role.get(),
	                            firstName,
	                            lastName,
	                            email)));
	        }
	        return user;
	    }
	    
	    public Optional<Role> addRole(String roleName, String roleDesc){
	        LOGGER.info("New role adding " + roleName);
	        Optional<Role> role = Optional.empty();
	        if (!roleRepository.findByRoleName(roleName).isPresent()) {
	            role = Optional.of(roleRepository.save(new Role(roleName, roleDesc)));
	        }
	        return role;
	    }
	    

	    public java.util.List<User> getAll() {
	    	LOGGER.debug("Lista usera");
	        return userRepository.findAll();
	    }
	    
	    public User getUserById(long id) {
	    	return userRepository.findById(id).get();
	    	
	    }
	    
	    public Optional<User> getUserByName(String name) {
	    	return userRepository.findByUsername(name);
	    	
	    }
		public String deleteUser(String username)  {
		LOGGER.debug("Delete user: " + username);
			Optional<User> user = userRepository.findByUsername(username);
			if (!user.isPresent()) return "NOT_FOUND";
			userRepository.delete(user.get());
			return "OK";
		}

		public void addUserToteam(long user_id, long team_id) {
	    	 userRepository.addUserToTeam(user_id, team_id);
	    	
	    }
		
	public boolean checkUserToTeam(long user_id, long team_id) {
			return userRepository.checkUserToTeam(user_id, team_id);
		}
	
	
	public User updateUser(Long id, String password) {
		User user = userRepository.findById(id).get();
	    user.setPassword(passwordEncoder.encode(password));
    	return userRepository.save(user);
    }

	@Override
	public List<User> findUsersForTeam(String team) {
		return userRepository.findUsersForTeam(team);
	}

	public List<User> findUsersForTask(int id) {
		return userRepository.findUsersForTask(id);
		
	}
    
}
