package com.igor.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.igor.models.Team;

import com.igor.service.TeamServiceImpl;



@RestController
@RequestMapping("/")
public class TeamController {
	

	@Autowired
	private TeamServiceImpl teamService;
	
	@GetMapping("teams")
	public List<Team> getAllTeams(){
		return teamService.findAll();
	}
	
	 @GetMapping("teams/{id}")
	    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
		 try {
	        Team team = teamService.getTeam(id);
	        return ResponseEntity.ok().body(team);
		 }
		 catch (Exception e) {
			 return new ResponseEntity<Team>(HttpStatus.BAD_REQUEST);
		}
	    }
	
	 @GetMapping("teams/getTeamByName/{name}")
	    public ResponseEntity<Team> getTeamByName(@PathVariable String name) {
		 try {
	       Team team = teamService.getTeamByName(name);
	       if(team==null) {return new ResponseEntity<Team>(HttpStatus.BAD_REQUEST);}
	      
	       else return ResponseEntity.ok().body(team);
		 }
		 catch (Exception e) {
		  		return new ResponseEntity<Team>(HttpStatus.BAD_REQUEST);		}
	    }
	 @PostMapping("teams")
	 @PreAuthorize("hasRole('ROLE_Team Leader')")
	    public ResponseEntity<String> addTeam(@RequestBody Team team) {
		 	if(teamService.getTeamByName(team.getName())!=null){
		 		 return new ResponseEntity<>("Team already exists!", HttpStatus.BAD_REQUEST);
		 	}
		 	else {
	        teamService.addTeam(team);
	        return ResponseEntity.ok().body("Succesffuly added team!");
		 	}
	    }
	 
	 @PutMapping("teams/{id}")
	 @PreAuthorize("hasRole('ROLE_Team Leader')")
	    public ResponseEntity<String> updateTeam(@RequestBody Team team, @PathVariable Long id) {
		 try {
	        teamService.updateTeam(id, team);
	        return ResponseEntity.ok().body("Succesffuly updated team!");}
		 catch (Exception e) {
			 return new ResponseEntity<>("No such team!", HttpStatus.BAD_REQUEST);
	    }
	 }
	 @DeleteMapping("teams/{id}")
	 @PreAuthorize("hasRole('ROLE_Team Leader')")
	    public ResponseEntity<String> deleteTeam(@PathVariable Long id) {
		 try {
	        teamService.deleteTeam(id);
	        return ResponseEntity.ok().body("Succesffuly deleted team!");
		 }
		 catch (Exception e) {
			 return new ResponseEntity<>("No such team!", HttpStatus.BAD_REQUEST);
		}
	    }
	 
	 @GetMapping("teams/getTeams/{username}")
		public List<Team> getAllTeams(@PathVariable String username){
			return teamService.findTeamsForUser(username);
		}
	 
	 @GetMapping("teams/teamsForTask/{id}")
		public List<Team> getTeamsForTask(@PathVariable int id){
			return teamService.findTeamsForTask(id);
		}
}
