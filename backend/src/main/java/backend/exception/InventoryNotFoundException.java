package backend.exception;

public class InventoryNotFoundException extends RuntimeException{
    public InventoryNotFoundException(Long id) {
        super("Could not find customer with id " + id);
    }

    public InventoryNotFoundException(String message) {
        super(message);  // pass the error message to the parent constructor
    }
}
