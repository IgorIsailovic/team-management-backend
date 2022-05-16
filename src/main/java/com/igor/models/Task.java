package com.igor.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.igor.enums.Status;

@Entity
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String description;
	
	private int est_dur;
	
	private Status status;
	
	
	@ManyToMany
	@JoinTable(
	  name = "task_user", 
	  joinColumns = @JoinColumn(name = "task_id"), 
	  inverseJoinColumns = @JoinColumn(name = "user_id"))
    	Set<User> userTask;
	
	  @ManyToOne(fetch = FetchType.LAZY, optional = false)
	  @JoinColumn(name = "team_id", nullable = false)
	  @OnDelete(action = OnDeleteAction.CASCADE)
	  @JsonIgnore
	  private Team team;
	
	  
	  
	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	public int getEst_dur() {
		return est_dur;
	}

	public void setEst_dur(int est_dur) {
		this.est_dur = est_dur;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}


	public Task(Long id, String name, String description, int est_dur, Status status, Team team) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.est_dur = est_dur;
		this.status = status;
		this.team = team;

	}

	public Task() {
	}
	
	
	
}
