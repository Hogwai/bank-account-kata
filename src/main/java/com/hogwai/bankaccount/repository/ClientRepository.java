package com.hogwai.bankaccount.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hogwai.bankaccount.model.Client;

@Repository
public interface ClientRepository extends MongoRepository<Client, Integer>{
	public Client findByUsername(String username);
	
	public Client findByUsernameAndPassword(String username, String password);

}
