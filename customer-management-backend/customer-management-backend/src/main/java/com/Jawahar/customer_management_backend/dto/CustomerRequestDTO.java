package com.Jawahar.customer_management_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequestDTO {

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "NIC is mandatory")
    private String nic;

    @NotNull(message = "Date of Birth is mandatory")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private List<String> mobiles;

    private List<AddressDTO> addresses;
}