package com.igor.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igor.exceptions.ResourceNotFoundException;
import com.igor.models.Task;
import com.igor.models.Team;
import com.igor.repository.TeamRepository;
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
	        Team team = teamService.getTeam(id);
	        return ResponseEntity.ok().body(team);
	    }
	
	 @GetMapping("teams/getTeamByName/{name}")
	    public ResponseEntity<Team> getTeamByName(@PathVariable String name) {
	        Team team = teamService.getTeamByName(name);
	        return ResponseEntity.ok().body(team);
	    }
	 @PostMapping("teams")
	    public ResponseEntity<String> addTeam(@RequestBody Team team) {
	        teamService.addTeam(team);
	        return ResponseEntity.ok().body("Succesffuly added team!");
	    }
	 
	 @PutMapping("teams/{id}")
	    public ResponseEntity<String> updateTeam(@RequestBody Team team, @PathVariable Long id) {
	        teamService.updateTeam(id, team);
	        return ResponseEntity.ok().body("Succesffuly updated team!");
	    }
	 
	 @DeleteMapping("teams/{id}")
	    public ResponseEntity<String> deleteTeam(@PathVariable Long id) {
	        teamService.deleteTeam(id);
	        return ResponseEntity.ok().body("Succesffuly deleted team!");
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
