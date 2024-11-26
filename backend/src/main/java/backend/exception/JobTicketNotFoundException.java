package backend.exception;

public class JobTicketNotFoundException extends RuntimeException{
    public JobTicketNotFoundException(Long id) {
        super("Could not find customer with id " + id);
    }

    public JobTicketNotFoundException(String message) {
        super(message);  // pass the error message to the parent constructor
    }
}
