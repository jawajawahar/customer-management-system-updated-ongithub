package com.Jawahar.customer_management_backend;

import com.Jawahar.customer_management_backend.entity.Customer;
import com.Jawahar.customer_management_backend.repository.CustomerRepository;
import com.Jawahar.customer_management_backend.service.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepo;

    @InjectMocks
    private CustomerService customerService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddFamilyMember_Success() {
        // Arrange
        Customer main = new Customer();
        main.setId(1L);
        main.setName("Parent");

        Customer relative = new Customer();
        relative.setId(2L);
        relative.setName("Child");

        when(customerRepo.findById(1L)).thenReturn(Optional.of(main));
        when(customerRepo.findById(2L)).thenReturn(Optional.of(relative));

        // Act
        customerService.addFamilyMember(1L, 2L);

        // Assert
        assertTrue(main.getFamilyMembers().contains(relative));
        assertTrue(relative.getFamilyMembers().contains(main));
        verify(customerRepo, times(1)).save(main);
    }

    @Test
    public void testAddFamilyMember_SelfLinking_ThrowsException() {
        // Arrange: Mock the repo so the "Customer not found" check passes
        Customer main = new Customer();
        main.setId(1L);
        when(customerRepo.findById(1L)).thenReturn(Optional.of(main));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            customerService.addFamilyMember(1L, 1L);
        });

        assertEquals("A customer cannot be their own family member", exception.getMessage());
    }
}