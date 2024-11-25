package backend.repository;

public interface EmployeRepository extends JpaRepository<Employe, Long> {
    boolean existsByEmail(String email);

    Optional<Employe> findByEmail(String email);
}
