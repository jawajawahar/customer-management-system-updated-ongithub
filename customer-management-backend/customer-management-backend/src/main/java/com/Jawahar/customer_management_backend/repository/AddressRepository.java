package com.Jawahar.customer_management_backend.repository;

import com.Jawahar.customer_management_backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}