package com.Jawahar.customer_management_backend.repository;

import com.Jawahar.customer_management_backend.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByNic(String nic);

    boolean existsByNic(String nic);

    @Query(
            "SELECT c FROM Customer c " +
                    "WHERE (:name = '' OR LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
                    "AND (:nic = '' OR LOWER(c.nic) LIKE LOWER(CONCAT('%', :nic, '%')))"
    )
    Page<Customer> searchCustomers(
            @Param("name") String name,
            @Param("nic") String nic,
            Pageable pageable
    );
}