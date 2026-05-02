package com.Jawahar.customer_management_backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.Jawahar.customer_management_backend.controller.CustomerController;
import com.Jawahar.customer_management_backend.dto.*;
import com.Jawahar.customer_management_backend.service.CustomerService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CustomerController.class)
public class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService service;

    @Autowired
    private ObjectMapper objectMapper;

    // =========================
    // CREATE
    // =========================
    @Test
    void testCreateCustomer() throws Exception {

        CustomerRequestDTO dto = new CustomerRequestDTO();
        dto.setName("Test");
        dto.setNic("123456789V");
        dto.setDob(LocalDate.of(2000, 1, 1));

        CustomerResponseDTO response = new CustomerResponseDTO();
        response.setId(1L);
        response.setName("Test");

        when(service.create(any())).thenReturn(response);

        mockMvc.perform(post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test"));
    }

    // =========================
    // GET ALL (FIXED)
    // =========================
    @Test
    void testGetAllCustomers() throws Exception {
        // Create sample data
        CustomerResponseDTO c = new CustomerResponseDTO();
        c.setId(1L);
        c.setName("Kasun");

        // Wrap the list in a Page object (Required for Pagination)
        List<CustomerResponseDTO> list = Arrays.asList(c); // Use Arrays.asList for Java 8
        Page<CustomerResponseDTO> page = new PageImpl<>(list);

        // Mock the service to expect any Pageable and return our Page
        when(service.getAll(any(org.springframework.data.domain.Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/customers")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Kasun")); // Note: .content is added by Page
    }

    // =========================
    // GET BY ID
    // =========================
    @Test
    void testGetById() throws Exception {

        CustomerResponseDTO c = new CustomerResponseDTO();
        c.setId(1L);
        c.setName("Kasun");

        when(service.getById(1L)).thenReturn(c);

        mockMvc.perform(get("/api/customers/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Kasun"));
    }

    // =========================
    // DELETE
    // =========================
    @Test
    void testDeleteCustomer() throws Exception {

        mockMvc.perform(delete("/api/customers/1"))
                .andExpect(status().isOk());
    }
}