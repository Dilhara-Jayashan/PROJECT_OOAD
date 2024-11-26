package backend.controller;

import backend.exception.ClientNotFoundException;
import backend.model.Client;
import backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;


    @PostMapping("/client")
    Client newClient(@RequestBody Client newClient) {
        return clientRepository.save(newClient);
    }

    @GetMapping("/client")
    List<Client> getAllClient() {
        return clientRepository.findAll();
    }

    @GetMapping("/client/{id}")
    Client getClientId(@PathVariable Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(id));
    }

    @PutMapping("/client/{id}")
    Client updateClient(@RequestBody Client newClient, @PathVariable Long id) {
        return clientRepository.findById(id)
                .map(Client -> {
                    Client.setClientCode(newClient.getClientCode());
                    Client.setName(newClient.getName());
                    Client.setEmail(newClient.getEmail());
                    Client.setPassword(newClient.getPassword());
                    Client.setPhone(newClient.getPhone());
                    Client.setAddress(newClient.getAddress());
                    return clientRepository.save(Client);
                }).orElseThrow(() -> new ClientNotFoundException(id));
    }

    @DeleteMapping("/client/{id}")
    String deleteClient(@PathVariable Long id) {
        if (!clientRepository.existsById(id)) {
            throw new ClientNotFoundException(id);
        }
        clientRepository.deleteById(id);
        return "data with id " + id + " Deleted ";
    }
}
