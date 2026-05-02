package com.Jawahar.customer_management_backend.dto;

import lombok.Data;

@Data
public class AddressResponseDTO {

    private Long id;
    private String line1;
    private String line2;
    private String city;
    private String country;

    public AddressResponseDTO() {}

    public AddressResponseDTO(Long id, String line1, String line2, String city, String country) {
        this.id = id;
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.country = country;
    }

    public Long getId() { return id; }
    public String getLine1() { return line1; }
    public String getLine2() { return line2; }
    public String getCity() { return city; }
    public String getCountry() { return country; }

    public void setId(Long id) { this.id = id; }
    public void setLine1(String line1) { this.line1 = line1; }
    public void setLine2(String line2) { this.line2 = line2; }
    public void setCity(String city) { this.city = city; }
    public void setCountry(String country) { this.country = country; }
}