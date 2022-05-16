package com.igor.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.JoinColumn;

@Entity
@JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
public class Team {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	
	
	@ManyToMany
	@JoinTable(
	  name = "team_user", 
	  joinColumns = @JoinColumn(name = "team_id"), 
	  inverseJoinColumns = @JoinColumn(name = "user_id"))
      Set<User> userTeam;
	
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
	
	public Team(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public Team() {}
	
	
}
