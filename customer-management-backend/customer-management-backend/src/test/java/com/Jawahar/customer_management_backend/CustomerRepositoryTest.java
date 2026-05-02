package com.Jawahar.customer_management_backend;

import com.Jawahar.customer_management_backend.entity.Customer;
import com.Jawahar.customer_management_backend.repository.CustomerRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional // Automatically rolls back database changes after each test
public class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepo;

    /**
     * Helper method to generate a short unique NIC (10 characters)
     * to prevent "Data too long" exceptions in the database.
     */
    private String generateShortNic() {
        return UUID.randomUUID().toString().substring(0, 10);
    }

    // ✅ CREATE
    @Test
    void testCreateCustomer() {
        Customer c = new Customer();
        c.setName("Test User");
        c.setNic(generateShortNic());
        c.setDob(LocalDate.of(2000, 1, 1));

        Customer saved = customerRepo.save(c);

        assertNotNull(saved.getId());
        assertEquals("Test User", saved.getName());
    }

    // ✅ FIND BY NIC
    @Test
    void testFindByNic() {
        String nic = generateShortNic();

        Customer c = new Customer();
        c.setName("Find User");
        c.setNic(nic);
        c.setDob(LocalDate.now());

        customerRepo.save(c);

        Customer found = customerRepo.findByNic(nic).orElse(null);

        assertNotNull(found);
        assertEquals("Find User", found.getName());
    }

    // ✅ UPDATE
    @Test
    void testUpdateCustomer() {
        Customer c = new Customer();
        c.setName("Old Name");
        c.setNic(generateShortNic());
        c.setDob(LocalDate.now());

        Customer saved = customerRepo.save(c);

        saved.setName("New Name");
        customerRepo.save(saved);

        Customer updated = customerRepo.findById(saved.getId()).orElse(null);

        assertNotNull(updated);
        assertEquals("New Name", updated.getName());
    }

    // ✅ DELETE
    @Test
    void testDeleteCustomer() {
        Customer c = new Customer();
        c.setName("Delete User");
        c.setNic(generateShortNic());
        c.setDob(LocalDate.now());

        Customer saved = customerRepo.save(c);

        customerRepo.deleteById(saved.getId());

        Customer deleted = customerRepo.findById(saved.getId()).orElse(null);

        assertNull(deleted);
    }
}