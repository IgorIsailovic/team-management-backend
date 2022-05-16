package com.igor.service;

import java.util.List;

import com.igor.models.Role;

public interface RoleService {
	
	List<Role> findAll();

	void addLead(Role lead);

	Role getLead(Long id);

	Role updateLead(Long id, Role lead);

	void deleteLead(Long id);

}
