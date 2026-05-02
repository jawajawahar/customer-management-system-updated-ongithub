package com.Jawahar.customer_management_backend.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CustomerResponseDTO {

    private Long id;
    private String name;
    private String nic;
    private LocalDate dob;
    private List<String> mobiles;
    private List<AddressResponseDTO> addresses;
    private List<String> familyMemberNames; // Or use a simple DTO with ID and Name

    public CustomerResponseDTO() {}

    public CustomerResponseDTO(Long id, String name, String nic, LocalDate dob,
                               List<String> mobiles, List<AddressResponseDTO> addresses) {
        this.id = id;
        this.name = name;
        this.nic = nic;
        this.dob = dob;
        this.mobiles = mobiles;
        this.addresses = addresses;

    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getNic() { return nic; }
    public LocalDate getDob() { return dob; }
    public List<String> getMobiles() { return mobiles; }

    public List<AddressResponseDTO> getAddresses() { return addresses; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setNic(String nic) { this.nic = nic; }
    public void setDob(LocalDate dob) { this.dob = dob; }
    public void setMobiles(List<String> mobiles) { this.mobiles = mobiles; }

    public void setAddresses(List<AddressResponseDTO> addresses) { this.addresses = addresses; }
}