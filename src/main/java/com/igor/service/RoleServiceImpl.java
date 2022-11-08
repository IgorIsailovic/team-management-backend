package com.igor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.models.Role;
import com.igor.repository.RoleRepository;



@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
    private RoleRepository repository;

	  @Override
	    public List<Role> findAll() {
	       List<Role> leads = repository.findAll();
	        return leads;
	    }
	    
	    @Override
	    public void addLead(Role lead) {
	    	repository.save(lead);
	    }
	    
	    @Override
	    public Role getLead(Long id) {
	    	return repository.getById(id);
	    }
	    
	    @Override
	    public Role updateLead(Long id, Role lead) {
	    	return repository.save(lead);
	    }
	    
	    @Override
	    public void deleteLead(Long id) {
	    	repository.deleteById(id);
	    }
}
