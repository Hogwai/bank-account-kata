package com.hogwai.bankaccount.resource;

import java.util.Calendar;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hogwai.bankaccount.model.Client;
import com.hogwai.bankaccount.model.Operation;
import com.hogwai.bankaccount.model.Operation.Type;
import com.hogwai.bankaccount.repository.ClientRepository;
import com.hogwai.bankaccount.repository.OperationRepository;

@RestController
@RequestMapping("/operations")
@CrossOrigin(origins = "http://localhost:3000")
public class OperationController {

	@Autowired
	private OperationRepository operationRepository;

	@Autowired
	private ClientRepository clientRepository;
	
	@GetMapping("/{username}")
	public List<Operation> getOperationsByClient(@PathVariable String username) {
		return operationRepository.findByClientId(clientRepository.findByUsername(username).getId());
	}

	@PostMapping("/deposit")
	public ResponseEntity<String> createDeposit(@RequestBody Operation deposit) {
		Client client = clientRepository.findByUsername(deposit.getClient().getUsername());
		client.setCurrentBalance(client.getCurrentBalance().add(deposit.getAmount()));
		clientRepository.save(client);

		deposit.setClient(client);
		deposit.setBalanceAfterOp(client.getCurrentBalance());
		
 
		deposit.setDate(Calendar.getInstance().getTime());
		deposit.setType(Type.DEPOSIT);
		operationRepository.save(deposit);
		return ResponseEntity.status(HttpStatus.CREATED).body("Dépôt effectué.");
	}

	@PostMapping("/withdrawal")
	public ResponseEntity<String> createWithdrawal(@RequestBody Operation withdrawal) {
		Client client = clientRepository.findByUsername(withdrawal.getClient().getUsername());
		if (client.getCurrentBalance().compareTo(withdrawal.getAmount()) < 0) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN)
					.body("Vous n'avez pas assez d'argent sur votre compte pour effectuer un retrait.");
		}
		client.setCurrentBalance(client.getCurrentBalance().subtract(withdrawal.getAmount()));
		clientRepository.save(client);

		withdrawal.setClient(client);
		withdrawal.setBalanceAfterOp(client.getCurrentBalance());
		withdrawal.setDate(Calendar.getInstance().getTime());
		withdrawal.setType(Type.WITHDRAWAL);
		operationRepository.save(withdrawal);
		return ResponseEntity.status(HttpStatus.CREATED).body("Retrait effectué.");
	}
}
