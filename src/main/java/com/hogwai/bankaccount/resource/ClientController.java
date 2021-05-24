package com.hogwai.bankaccount.resource;

import java.math.BigDecimal;
import java.util.Calendar;

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
import com.hogwai.bankaccount.repository.ClientRepository;

@RestController
@RequestMapping("/client/")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

	@Autowired
	private ClientRepository clientRepository;

	@GetMapping("/{username}")
	public ResponseEntity<Client> getClient(@PathVariable String username) {
		var clientRetrieved = clientRepository.findByUsername(username);
		return ResponseEntity.ok(clientRetrieved);
	}

	@PostMapping("/connect")
	public ResponseEntity<String> connect(@RequestBody Client client) {
		if (client.getUsername().isEmpty() || client.getPassword().isEmpty()) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Veuillez remplir tous les champs.");
		}
		var clientConnected = clientRepository.findByUsername(client.getUsername());
		if (clientConnected != null && clientConnected.getPassword().equals(client.getPassword())) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Connexion effectuée.");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
				"Vos identifiants sont incorrects ou vous n'êtes pas encore client. Veuillez réessayer ou vous inscrire.");
	}

	@PostMapping("/register")
	public ResponseEntity<String> createClient(@RequestBody Client client) {
		if (client.getName().isEmpty() || client.getSurname().isEmpty() || client.getUsername().isEmpty()
				|| client.getPassword().isEmpty()) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Veuillez remplir tous les champs.");
		}
		var clientToRegister = clientRepository.findByUsername(client.getUsername());
		if (clientToRegister != null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN)
					.body("Le pseudo que vous avez choisi existe déjà. Veuillez en choisir un autre.");
		}
		client.setCreationDate(Calendar.getInstance().getTime());
		client.setCurrentBalance(BigDecimal.ZERO);
		clientRepository.save(client);
		return ResponseEntity.status(HttpStatus.CREATED).body("Inscription effectuée.");
	}
}
