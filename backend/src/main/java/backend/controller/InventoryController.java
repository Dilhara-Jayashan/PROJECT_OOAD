package backend.controller;

import backend.exception.InventoryNotFoundException;
import backend.model.Inventory;
import backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/inventory")
    Inventory newInventory(@RequestBody Inventory newInventory) {
        return inventoryRepository.save(newInventory);
    }

    @GetMapping("/inventory")
    List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/{id}")
    Inventory getInventoryId(@PathVariable Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

    @PutMapping("/inventory/{id}")
    Inventory updateInventory(@RequestBody Inventory newInventory, @PathVariable Long id) {
        return inventoryRepository.findById(id)
                .map(Inventory -> {
                    Inventory.setStockCode(newInventory.getStockCode());
                    Inventory.setQuantity(newInventory.getQuantity());
                    Inventory.setValue(newInventory.getValue());
                    Inventory.setWeight(newInventory.getWeight());
                    Inventory.setWidth(newInventory.getWidth());
                    Inventory.setThickness(newInventory.getThickness());
                    Inventory.setMaterialGrade(newInventory.getMaterialGrade());
                    Inventory.setTotalWeight(newInventory.getTotalWeight());
                    Inventory.setTotalValue(newInventory.getTotalValue());
                    return inventoryRepository.save(Inventory);
                }).orElseThrow(() -> new InventoryNotFoundException(id));
    }

    @DeleteMapping("/inventory/{id}")
    String deleteInventory(@PathVariable Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new InventoryNotFoundException(id);
        }
        inventoryRepository.deleteById(id);
        return "data with id " + id + " Deleted ";
    }
}
