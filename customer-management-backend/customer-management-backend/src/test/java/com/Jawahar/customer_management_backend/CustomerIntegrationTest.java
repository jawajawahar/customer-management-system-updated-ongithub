package com.Jawahar.customer_management_backend;

import com.Jawahar.customer_management_backend.entity.Customer;
import com.Jawahar.customer_management_backend.repository.CustomerRepository;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerIntegrationTest {

    @Autowired
    private CustomerRepository repo;

    @BeforeEach
    void cleanDB() {
        repo.deleteAll();
    }

    @Test
    void testCreateCustomer() {

        Customer c = new Customer();
        c.setName("Test User");
        c.setNic("NIC_" + System.currentTimeMillis());
        c.setDob(LocalDate.of(2000, 1, 1));

        Customer saved = repo.save(c);

        assertNotNull(saved.getId());
    }

    @Test
    void testUpdateCustomer() {

        Customer c = new Customer();
        c.setName("Old");
        c.setNic("NIC_" + System.currentTimeMillis());
        c.setDob(LocalDate.now());

        Customer saved = repo.save(c);

        saved.setName("New");
        repo.save(saved);

        Customer updated = repo.findById(saved.getId()).orElse(null);

        assertEquals("New", updated.getName());
    }

    @Test
    void testDeleteCustomer() {

        Customer c = new Customer();
        c.setName("Delete");
        c.setNic("NIC_" + System.currentTimeMillis());
        c.setDob(LocalDate.now());

        Customer saved = repo.save(c);

        repo.deleteById(saved.getId());

        assertFalse(repo.findById(saved.getId()).isPresent());
    }
}