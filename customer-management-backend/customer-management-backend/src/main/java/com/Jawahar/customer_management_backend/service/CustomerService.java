package com.Jawahar.customer_management_backend.service;

import com.Jawahar.customer_management_backend.dto.*;
import com.Jawahar.customer_management_backend.entity.*;
import com.Jawahar.customer_management_backend.repository.*;
import com.Jawahar.customer_management_backend.util.CustomerMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors; // For the .collect(Collectors.toMap) logic

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors; // Necessary for .collect(Collectors.toMap)

import java.util.ArrayList;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private CityRepository cityRepo;

    @Autowired
    private CountryRepository countryRepo;

    @Transactional
    public CustomerResponseDTO create(CustomerRequestDTO dto) {
        if (customerRepo.existsByNic(dto.getNic())) {
            throw new RuntimeException("Customer already exists with NIC: " + dto.getNic());
        }

        Customer customer = new Customer();
        // Initialize lists to prevent NullPointerExceptions
        customer.setMobiles(new ArrayList<>());
        customer.setAddresses(new ArrayList<>());

        mapDtoToEntity(dto, customer);

        Customer saved = customerRepo.save(customer);
        return CustomerMapper.toDTO(saved);
    }

    @Transactional
    public CustomerResponseDTO update(Long id, CustomerRequestDTO dto) {
        Customer customer = customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));

        customerRepo.findByNic(dto.getNic())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("NIC already assigned to another customer");
                    }
                });

        mapDtoToEntity(dto, customer);
        Customer updated = customerRepo.save(customer);
        return CustomerMapper.toDTO(updated);
    }

    private void mapDtoToEntity(CustomerRequestDTO dto, Customer customer) {

        customer.setName(dto.getName());
        customer.setNic(dto.getNic());
        customer.setDob(dto.getDob());


        customer.getMobiles().clear();

        if (dto.getMobiles() != null) {
            for (String m : dto.getMobiles()) {
                if (m != null && !m.trim().isEmpty()) {
                    customer.getMobiles().add(m.trim());
                }
            }
        }

        customer.getAddresses().clear();

        if (dto.getAddresses() != null) {
            for (AddressDTO a : dto.getAddresses()) {

                City city = cityRepo.findByNameIgnoreCase(a.getCity())
                        .orElseThrow(() -> new RuntimeException("City not found: " + a.getCity()));

                Country country = countryRepo.findByNameIgnoreCase(a.getCountry())
                        .orElseThrow(() -> new RuntimeException("Country not found: " + a.getCountry()));

                Address address = new Address();

                address.setAddressLine1(a.getLine1());
                address.setAddressLine2(a.getLine2());
                address.setCity(city);
                address.setCountry(country);
                address.setCustomer(customer);

                customer.getAddresses().add(address);
            }
        }
    }
    public Page<CustomerResponseDTO> search(String name, String nic, Pageable pageable) {
        return customerRepo.searchCustomers(name, nic, pageable).map(CustomerMapper::toDTO);
    }

    public Page<CustomerResponseDTO> getAll(Pageable pageable) {
        return customerRepo.findAll(pageable).map(CustomerMapper::toDTO);
    }

    @Transactional
    public CustomerResponseDTO addFamilyMember(Long customerId, Long memberId) {
        // 1. Fetch both customers
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Primary customer not found"));
        Customer member = customerRepo.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Family member customer not found"));

        // 2. Prevent self-linking
        if (customerId.equals(memberId)) {
            throw new RuntimeException("A customer cannot be their own family member");
        }

        // 3. Add the relationship (if not already linked)
        if (!customer.getFamilyMembers().contains(member)) {
            customer.getFamilyMembers().add(member);
            // Since it's Many-to-Many, usually we link both ways
            member.getFamilyMembers().add(customer);
        }

        customerRepo.save(customer);
        return CustomerMapper.toDTO(customer);
    }

    public CustomerResponseDTO getById(Long id) {
        Customer c = customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return CustomerMapper.toDTO(c);
    }

    public CustomerResponseDTO removeFamilyMember(Long id, Long memberId) {
        Customer customer = customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Customer member = customerRepo.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Family member not found"));

        customer.getFamilyMembers().remove(member);

        return CustomerMapper.toDTO(customerRepo.save(customer));
    }

    public void delete(Long id) {
        customerRepo.deleteById(id);
    }
}