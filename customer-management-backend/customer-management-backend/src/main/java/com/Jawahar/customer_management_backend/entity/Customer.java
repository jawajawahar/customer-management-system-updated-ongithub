package com.Jawahar.customer_management_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String nic;

    @Column(nullable = false)
    private LocalDate dob;

    // =========================
    // 🔥 MOBILES
    // =========================
    @ElementCollection
    @CollectionTable(name = "customer_mobiles", joinColumns = @JoinColumn(name = "customer_id"))
    @Column(name = "mobile_number")
    private List<String> mobiles = new ArrayList<>();

    // =========================
    // 🔥 ADDRESSES
    // =========================
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();

    // =========================
    // 🔥 FAMILY MEMBERS
    // =========================
    @ManyToMany
    @JoinTable(
            name = "customer_family",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "family_member_id")
    )
    private List<Customer> familyMembers = new ArrayList<>();
}