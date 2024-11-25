package backend.exception;

public class AdminNotFoundException extends RuntimeException {
    public AdminNotFoundException(Long id) {
        super("Could not find with id " + id);
    }

    public AdminNotFoundException(String message) {
        super(message);  // pass the error message to the parent constructor
    }
}
