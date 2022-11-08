package com.igor.service;

import java.util.List;

import com.igor.models.Team;

public interface TeamService {
	
	List<Team> findAll();

	void addTeam(Team team);

	Team getTeam(Long id);

	Team updateTeam(Long id, Team team);

	void deleteTeam(Long id);
	
	List<Team> findTeamsForUser(String username);
	
	Team getTeamByName(String name);
	
	List<Team> findTeamsForTask(int id);

}
