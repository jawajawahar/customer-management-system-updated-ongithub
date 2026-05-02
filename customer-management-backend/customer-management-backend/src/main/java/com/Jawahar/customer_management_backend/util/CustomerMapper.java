package com.Jawahar.customer_management_backend.util;

import com.Jawahar.customer_management_backend.dto.*;
import com.Jawahar.customer_management_backend.entity.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CustomerMapper {

    public static CustomerResponseDTO toDTO(Customer customer) {

        CustomerResponseDTO dto = new CustomerResponseDTO();

        dto.setId(customer.getId());
        dto.setName(customer.getName());
        dto.setNic(customer.getNic());
        dto.setDob(customer.getDob());

        // MOBILES (FIXED)
        if (customer.getMobiles() != null) {
            dto.setMobiles(new ArrayList<>(customer.getMobiles()));
        }

        // ADDRESSES (FIXED SAFE)
        if (customer.getAddresses() != null) {
            dto.setAddresses(
                    customer.getAddresses().stream()
                            .map(addr -> {
                                AddressResponseDTO a = new AddressResponseDTO();

                                a.setLine1(addr.getAddressLine1());
                                a.setLine2(addr.getAddressLine2());

                                a.setCity(
                                        addr.getCity() != null ? addr.getCity().getName() : null
                                );

                                a.setCountry(
                                        addr.getCountry() != null ? addr.getCountry().getName() : null
                                );

                                return a;
                            }).collect(Collectors.toList())
            );
        }

        // FAMILY MEMBERS
        if (customer.getFamilyMembers() != null) {
            dto.setFamilyMemberNames(
                    customer.getFamilyMembers().stream()
                            .map(Customer::getName)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }
}