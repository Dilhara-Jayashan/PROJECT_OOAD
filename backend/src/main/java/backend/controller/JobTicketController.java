package backend.controller;
import backend.exception.JobTicketNotFoundException;
import backend.model.JobTicket;
import backend.repository.JobTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class JobTicketController {
    @Autowired
    private JobTicketRepository jobTicketRepository;

    @PostMapping("/jobTicket")
    JobTicket newJobTicket(@RequestBody JobTicket newJobTicket) {
        return jobTicketRepository.save(newJobTicket);
    }

    @GetMapping("/jobTicket")
    List<JobTicket> getAllJobTicket() {
        return jobTicketRepository.findAll();
    }

    @GetMapping("/jobTicket/{id}")
    JobTicket getJobTicketId(@PathVariable Long id) {
        return jobTicketRepository.findById(id)
                .orElseThrow(() -> new JobTicketNotFoundException(id));
    }

    @PutMapping("/jobTicket/{id}")
    JobTicket updateJobTicket(@RequestBody JobTicket newJobTicket, @PathVariable Long id) {
        return jobTicketRepository.findById(id)
                .map(JobTicket -> {
                    JobTicket.setJobCode(newJobTicket.getJobCode());
                    JobTicket.setClientCode(newJobTicket.getClientCode());
                    JobTicket.setEstimateTime(newJobTicket.getEstimateTime());
                    JobTicket.setProgress(newJobTicket.getProgress());
                    JobTicket.setStockNeed(newJobTicket.getStockNeed());
                    JobTicket.setQuantity(newJobTicket.getQuantity());
                    return jobTicketRepository.save(JobTicket);
                }).orElseThrow(() -> new JobTicketNotFoundException(id));
    }

    @DeleteMapping("/jobTicket/{id}")
    String deleteJobTicket(@PathVariable Long id) {
        if (!jobTicketRepository.existsById(id)) {
            throw new JobTicketNotFoundException(id);
        }
        jobTicketRepository.deleteById(id);
        return "data with id " + id + " Deleted ";
    }
}
