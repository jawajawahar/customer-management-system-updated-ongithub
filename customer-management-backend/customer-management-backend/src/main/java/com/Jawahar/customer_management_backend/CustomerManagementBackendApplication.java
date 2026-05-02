package com.Jawahar.customer_management_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CustomerManagementBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerManagementBackendApplication.class, args);
	}

}
