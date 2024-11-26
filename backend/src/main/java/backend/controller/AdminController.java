package backend.controller;

import backend.exception.AdminNotFoundException;
import backend.model.Admin;
import backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/admin")
    Admin newAdmin(@RequestBody Admin newAdmin) {
        return adminRepository.save(newAdmin);
    }

    @GetMapping("/admin")
    List<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }

    @GetMapping("/admin/{id}")
    Admin getAdminId(@PathVariable Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new AdminNotFoundException(id));
    }

    @PutMapping("/admin/{id}")
    Admin updateAdmin(@RequestBody Admin newAdmin, @PathVariable Long id) {
        return adminRepository.findById(id)
                .map(Admin -> {
                    Admin.setManagerID(newAdmin.getManagerID());
                    Admin.setName(newAdmin.getName());
                    Admin.setEmail(newAdmin.getEmail());
                    Admin.setPassword(newAdmin.getPassword());
                    Admin.setPhone(newAdmin.getPhone());
                    Admin.setType(newAdmin.getType());
                    return adminRepository.save(Admin);
                }).orElseThrow(() -> new AdminNotFoundException(id));
    }

    @DeleteMapping("/admin/{id}")
    String deleteAdmin(@PathVariable Long id) {
        if (!adminRepository.existsById(id)) {
            throw new AdminNotFoundException(id);
        }
        adminRepository.deleteById(id);
        return "data with id " + id + " Deleted ";
    }
    @GetMapping("/checkUser")
    public boolean checkEmailExists(@RequestParam String email, @RequestParam String type) {
        return adminRepository.existsByEmailAndType(email, type);  // This matches the updated method signature
    }
    @PostMapping("/login")
    public Admin login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        String type = loginData.get("type");

        // Validate the user's credentials and role
        Admin admin = adminRepository.findByEmailAndPasswordAndType(email, password, type);

        if (admin == null) {
            throw new AdminNotFoundException("Invalid credentials.");
        }
        return admin; // Return the user details if login is successful
    }


}
