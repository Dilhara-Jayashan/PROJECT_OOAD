package backend.repository;


import backend.model.JobTicket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobTicketRepository extends JpaRepository<JobTicket, Long> {

}
