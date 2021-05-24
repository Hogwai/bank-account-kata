package com.hogwai.bankaccount.model;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "Operation")
public class Operation {
    /*@Transient
    public static final String SEQUENCE_NAME = "Operation_sequence";*/
	
	public enum Type {
		DEPOSIT, WITHDRAWAL;
	}
	
	/*@Id
	private Integer id;*/
	private Client client;
	private Date date;
	private BigDecimal amount;
	private BigDecimal balanceAfterOp;
	private Type type;
	
	public Operation() {}
	public Operation(Client client, Date date, BigDecimal amount, BigDecimal balanceAfterOp, Type type) {
		super();
		this.client = client;
		this.date = date;
		this.amount = amount;
		this.balanceAfterOp = balanceAfterOp;
		this.type = type;
	}
}
