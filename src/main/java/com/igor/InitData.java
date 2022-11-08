package com.igor;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.igor.enums.Priority;
import com.igor.enums.Status;
import com.igor.models.Role;
import com.igor.models.Task;
import com.igor.models.Team;
import com.igor.models.User;
import com.igor.service.TaskService;
import com.igor.service.TeamService;
import com.igor.service.UserService;

@Component
public class InitData implements CommandLineRunner {

	private static Logger LOGGER = LoggerFactory.getLogger(InitData.class);

	@Autowired
	UserService userService;

	@Autowired
	TeamService teamService;

	@Autowired
	TaskService taskService;

	@Override
	public void run(String... args) throws Exception {

		Optional<Role> role = userService.addRole("Team Lead", "Team Lead");
		LOGGER.debug("Role Team Lead created? " + (role.isPresent() ? role.get().getRoleName() : "Nije"));

		Optional<Role> role2 = userService.addRole("User", "User");
		LOGGER.debug("Role USER created? " + (role2.isPresent() ? role2.get().getRoleName() : "Nije"));

		Optional<User> user1 = userService.addTeamLeader("max", "Max123!", "Max", "Smith", "max.smith@gmail.com");
		if (user1.isPresent()) {

			LOGGER.debug("User:" + user1.get().getId() + "/" + user1.get().getUsername() + "/"
					+ user1.get().getPassword() + " created");
			LOGGER.debug(user1.get().getRoles().toString());

		}

		Optional<User> user2 = userService.addTeamLeader("lynda", "Lynda123!", "Lynda", "Vasquez",
				"lynda.vasquez@gmail.com");
		if (user2.isPresent()) {

			LOGGER.debug("User:" + user2.get().getId() + "/" + user2.get().getUsername() + "/"
					+ user2.get().getPassword() + " created");
			LOGGER.debug(user2.get().getRoles().toString());

		}

		Optional<User> user3 = userService.signup("jim", "Jim123!", "Jim", "Maxwell", "jim.maxwell@gmail.com");
		if (user3.isPresent()) {

			LOGGER.debug("User:" + user3.get().getId() + "/" + user3.get().getUsername() + "/"
					+ user3.get().getPassword() + " created");
			LOGGER.debug(user3.get().getRoles().toString());

		}

		Optional<User> user4 = userService.signup("marta", "Marta123!", "Marta", "Petrovich",
				"marta.petrovich@gmail.com");
		if (user4.isPresent()) {

			LOGGER.debug("User:" + user4.get().getId() + "/" + user4.get().getUsername() + "/"
					+ user4.get().getPassword() + " created");
			LOGGER.debug(user4.get().getRoles().toString());

		}

		Optional<User> user5 = userService.signup("melinda", "Melinda123!", "Melinda", "Chavez",
				"melinda.chavez@gmail.com");
		if (user5.isPresent()) {

			LOGGER.debug("User:" + user5.get().getId() + "/" + user5.get().getUsername() + "/"
					+ user5.get().getPassword() + " created");
			LOGGER.debug(user5.get().getRoles().toString());

		}

		Task task1 = new Task((long) 1, "Task demo 1", "Task demo description", 2, Status.BACKLOG, 1, 1,
				Priority.MEDIUM);
		Task task2 = new Task((long) 2, "Task demo 2", "Task demo description", 2, Status.SELECTED, 1, 1,
				Priority.HIGH);
		Task task3 = new Task((long) 3, "Task demo 3", "Task demo description", 2, Status.SELECTED, 1, 1,
				Priority.HIGH);
		Task task4 = new Task((long) 4, "Task demo 4", "Task demo description", 2, Status.BACKLOG, 1, 1, Priority.LOW);
		Task task5 = new Task((long) 5, "Task demo 5", "Task demo description", 2, Status.BACKLOG, 1, 1,
				Priority.MEDIUM);
		Task task6 = new Task((long) 6, "Task demo 6", "Task demo description", 2, Status.INPROGRESS, 1, 1,
				Priority.MEDIUM);
		Task task7 = new Task((long) 7, "Task demo 7", "Task demo description", 2, Status.BACKLOG, 1, 1, Priority.HIGH);
		Task task8 = new Task((long) 8, "Task demo 8", "Task demo description", 2, Status.SELECTED, 1, 1,
				Priority.MEDIUM);
		Task task9 = new Task((long) 9, "Task demo 9", "Task demo description", 2, Status.FINISHED, 1, 1,
				Priority.HIGH);
		Task task10 = new Task((long) 10, "Task demo 10", "Task demo description", 2, Status.FINISHED, 1, 1,
				Priority.HIGH);

		Team team1 = new Team((long) 1, "Development");
		Team team2 = new Team((long) 2, "IT Operations");
		Team team3 = new Team((long) 3, "DevOps");
		Team team4 = new Team((long) 4, "QA/Testing");
		Team team5 = new Team((long) 5, "Security");

		taskService.addTask(task1);
		taskService.addTask(task2);
		taskService.addTask(task3);
		taskService.addTask(task4);
		taskService.addTask(task5);
		taskService.addTask(task6);
		taskService.addTask(task7);
		taskService.addTask(task8);
		taskService.addTask(task9);
		taskService.addTask(task10);

		teamService.addTeam(team1);
		teamService.addTeam(team2);
		teamService.addTeam(team3);
		teamService.addTeam(team4);
		teamService.addTeam(team5);

		userService.addUserToTeam(user1.get().getId(), 1);
		userService.addUserToTeam(user1.get().getId(), 2);
		userService.addUserToTeam(user1.get().getId(), 3);
		userService.addUserToTeam(user2.get().getId(), 4);
		userService.addUserToTeam(user2.get().getId(), 5);
		userService.addUserToTeam(user2.get().getId(), 2);
		userService.addUserToTeam(user3.get().getId(), 4);
		userService.addUserToTeam(user3.get().getId(), 5);
		userService.addUserToTeam(user4.get().getId(), 1);
		userService.addUserToTeam(user5.get().getId(), 2);

		userService.addUserToTask(user1.get().getId(), 1);
		userService.addUserToTask(user2.get().getId(), 1);
		userService.addUserToTask(user3.get().getId(), 1);
		userService.addUserToTask(user2.get().getId(), 2);
		userService.addUserToTask(user3.get().getId(), 2);
		userService.addUserToTask(user1.get().getId(), 3);
		userService.addUserToTask(user3.get().getId(), 3);
		userService.addUserToTask(user4.get().getId(), 3);
		userService.addUserToTask(user5.get().getId(), 3);
		userService.addUserToTask(user4.get().getId(), 4);
		userService.addUserToTask(user5.get().getId(), 5);
		userService.addUserToTask(user4.get().getId(), 6);
		userService.addUserToTask(user1.get().getId(), 7);
		userService.addUserToTask(user3.get().getId(), 7);
		userService.addUserToTask(user5.get().getId(), 7);
		userService.addUserToTask(user1.get().getId(), 8);
		userService.addUserToTask(user2.get().getId(), 8);
		userService.addUserToTask(user1.get().getId(), 9);
		userService.addUserToTask(user2.get().getId(), 9);
		userService.addUserToTask(user3.get().getId(), 9);
		userService.addUserToTask(user4.get().getId(), 9);
		userService.addUserToTask(user5.get().getId(), 9);
		userService.addUserToTask(user3.get().getId(), 10);
		userService.addUserToTask(user4.get().getId(), 10);

	}

}
