package com.hogwai.bankaccount.model;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "Client")
public class Client {
	
    @Transient
    public static final String SEQUENCE_NAME = "client_sequence";
    
	@Id
	private Integer id;
	private String name;
	private String surname;
	private String username;
	private String password;
	private BigDecimal currentBalance;
	private Date creationDate;
}
