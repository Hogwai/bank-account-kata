package com.hogwai.bankaccount.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hogwai.bankaccount.model.Operation;

@Repository
public interface OperationRepository extends MongoRepository<Operation, ObjectId>{
	
	public List<Operation> findByClientId(Integer id);
	

}
