package backend.controller;

import backend.exception.EmployeNotFoundException;
import backend.model.Employe;
import backend.repository.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmployeController {
    @Autowired
    private EmployeRepository employeRepository;

    @PostMapping("/employe")
    Employe newEmploye(@RequestBody Employe newEmploye) {
        return employeRepository.save(newEmploye);
    }

    @GetMapping("/employe")
    List<Employe> getAllEmploye() {
        return employeRepository.findAll();
    }

    @GetMapping("/employe/{id}")
    Employe getEmployeId(@PathVariable Long id) {
        return employeRepository.findById(id)
                .orElseThrow(() -> new EmployeNotFoundException(id));
    }

    @PutMapping("/employe/{id}")
    Employe updateEmploye(@RequestBody Employe newEmploye, @PathVariable Long id) {
        return employeRepository.findById(id)
                .map(Employe -> {
                    Employe.setEmpid(newEmploye.getEmpid());
                    Employe.setName(newEmploye.getName());
                    Employe.setEmail(newEmploye.getEmail());
                    Employe.setPassword(newEmploye.getPassword());
                    Employe.setPhone(newEmploye.getPhone());
                    Employe.setBirthday(newEmploye.getBirthday());
                    Employe.setAddress(newEmploye.getAddress());
                    Employe.setRoll(newEmploye.getRoll());
                    Employe.setAttendance(newEmploye.getAttendance());
                    Employe.setSalary(newEmploye.getSalary());
                    return employeRepository.save(Employe);
                }).orElseThrow(() -> new EmployeNotFoundException(id));
    }
    
}
