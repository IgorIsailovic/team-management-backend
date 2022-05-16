package com.igor.security;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.igor.models.User;
import com.igor.repository.UserRepository;

import java.util.Optional;

import static org.springframework.security.core.userdetails.User.withUsername;

/**
 * Service to associate user with password and roles setup in the database.
 *
 * Created by Mary Ellen Bowman
 */
@Component
public class SEUserDetailsService implements UserDetailsService {
	private static Logger LOGGER = LoggerFactory.getLogger(SEUserDetailsService.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtProvider jwtProvider;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    	LOGGER.debug("Search for " + s);
        User user = userRepository.findByUsername(s).orElseThrow(() ->
                new UsernameNotFoundException(String.format("User with name %s does not exist", s)));
        LOGGER.debug("User:" + user.getUsername() + "returned");
        return withUsername(user.getUsername())
            .password(user.getPassword())
            .authorities(user.getRoles())
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build();
    }

    /**
     * Extract username and roles from a validated jwt string.
     *
     * @param jwtToken jwt string
     * @return UserDetails if valid, Empty otherwise
     */
    public Optional<UserDetails> loadUserByJwtToken(String jwtToken) {
    	LOGGER.debug("Token: " + jwtToken);
        if (jwtProvider.isValidToken(jwtToken)) {
        	LOGGER.debug("Vraća user-a");
        	Optional<UserDetails> userDetail = Optional.of(
                withUsername(jwtProvider.getUsername(jwtToken))
                .authorities(jwtProvider.getRoles(jwtToken))
                .password("") //token does not have password but field may not be empty
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build());
        	LOGGER.debug("UserDetails present" + userDetail.isPresent());
        	LOGGER.debug("UserDetails present" + userDetail.get());
        	return userDetail;
        }
        LOGGER.error("Bad token!");
        return Optional.empty();
    }

    /**
     * Extract the username from the JWT then lookup the user in the database.
     *
     * @param jwtToken
     * @return
     */
    public Optional<UserDetails> loadUserByJwtTokenAndDatabase(String jwtToken) {
    	LOGGER.debug("Token: " + jwtToken + " vraća korisnika ako je dobar!");
        if (jwtProvider.isValidToken(jwtToken)) {
            return Optional.of(loadUserByUsername(jwtProvider.getUsername(jwtToken)));
        } else {
            return Optional.empty();
        }
    }
}