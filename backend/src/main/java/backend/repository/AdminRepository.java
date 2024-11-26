package backend.repository;

import backend.model.Admin;
import backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByEmailAndType(String email, String type);

    Admin findByEmailAndPasswordAndType(String email, String password, String type);
}
