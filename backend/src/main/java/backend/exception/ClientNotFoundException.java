package backend.exception;

public class ClientNotFoundException extends RuntimeException{
    public ClientNotFoundException(Long id) {
        super("Could not find customer with id " + id);
    }

    public ClientNotFoundException(String message) {
        super(message);  // pass the error message to the parent constructor
    }
}
