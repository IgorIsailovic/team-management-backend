package com.igor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.igor.models.Team;
import com.igor.repository.TeamRepository;


@Service
public class TeamServiceImpl implements TeamService {

	@Autowired
    private TeamRepository repository;

    @Override
    public List<Team> findAll() {
       List<Team> teams = repository.findAll();
        return teams;
    }
    
    @Override
    public void addTeam(Team team) {
    	repository.save(team);
    }
    
    @Override
    public Team getTeam(Long id) {
    	return repository.findById(id).get();
    }
    
    @Override
    public Team updateTeam(Long id, Team team) {
     Team t = repository.findById(id).get();
     t.setName(team.getName());
     return repository.save(t);
     
    }
    
    @Override
    public void deleteTeam(Long id) {
    	repository.deleteById(id);
    }
    
    public List<Team> findTeamsForUser(String username) {
	       List<Team> teams = repository.findAllUserTeams(username);
	        return teams;
	    }

	@Override
	public Team getTeamByName(String name) {
		return repository.findByName(name);
	}

	@Override
	public List<Team> findTeamsForTask(int id) {
		return repository.findTeamsForTask(id);
	}
}
