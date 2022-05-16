package com.igor.models;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;



/**
 * Security User Entity.
 *
 */
@Entity
@Table(name = "security_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    public User(String username, String password, Role role, String firstName, String lastName, String email) {
        this.username = username;
        this.password = password;
        this.roles = Arrays.asList(role);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "email")
    private String email;

    /**
     * Default Constructor.
     */
    protected User() {
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id",
                    referencedColumnName = "id"))


    private List<Role> roles;


    @ManyToMany(mappedBy = "userTeam")
Set<Team> teamUser;

    @ManyToMany(mappedBy = "userTask")
Set<Task> taskUser;


    
    public Set<Team> getTeamUser() {
		return teamUser;
	}

	public void setTeamUser(Set<Team> teamUser) {
		this.teamUser = teamUser;
	}

	public Set<Task> getTaskUser() {
		return taskUser;
	}

	public void setTaskUser(Set<Task> taskUser) {
		this.taskUser = taskUser;
	}

	public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}



