package com.Jawahar.customer_management_backend.repository;

import com.Jawahar.customer_management_backend.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country, Long> {

    Optional<Country> findByNameIgnoreCase(String name);
}