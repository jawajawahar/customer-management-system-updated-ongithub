package com.Jawahar.customer_management_backend.controller;

import com.Jawahar.customer_management_backend.dto.*;
import com.Jawahar.customer_management_backend.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class CustomerController {

    @Autowired
    private CustomerService service;

    // CREATE
    @PostMapping
    public ResponseEntity<CustomerResponseDTO> create(@Valid @RequestBody CustomerRequestDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    // PAGINATED GET
    @GetMapping
    public ResponseEntity<Page<CustomerResponseDTO>> getAll(
            @PageableDefault(size = 10, sort = "id", direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        System.out.println(">>> Backend: Fetching all customers...");
        return ResponseEntity.ok(service.getAll(pageable));
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequestDTO dto) {

        return ResponseEntity.ok(service.update(id, dto));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<CustomerResponseDTO>> search(
            @RequestParam(required = false, defaultValue = "") String name,
            @RequestParam(required = false, defaultValue = "") String nic,
            Pageable pageable) {

        return ResponseEntity.ok(service.search(name, nic, pageable));
    }

    // LINK FAMILY MEMBERS
    @PostMapping("/{id}/family/{memberId}")
    public ResponseEntity<CustomerResponseDTO> linkFamily(
            @PathVariable Long id,
            @PathVariable Long memberId) {

        return ResponseEntity.ok(service.addFamilyMember(id, memberId));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }

    @DeleteMapping("/{id}/family/{memberId}")
    public ResponseEntity<?> removeFamily(
            @PathVariable Long id,
            @PathVariable Long memberId) {

        return ResponseEntity.ok(service.removeFamilyMember(id, memberId));
    }
}