package com.Jawahar.customer_management_backend.service;

import com.Jawahar.customer_management_backend.entity.Customer;
import com.Jawahar.customer_management_backend.repository.CustomerRepository;
import org.dhatim.fastexcel.reader.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

@Service
public class BulkService {

    @Autowired
    private CustomerRepository customerRepo;

    // =========================
    // BULK CREATE
    // =========================
    @Transactional
    public String processExcel(MultipartFile file) throws Exception {

        AtomicInteger saved = new AtomicInteger(0);
        AtomicInteger skipped = new AtomicInteger(0);

        try (InputStream is = file.getInputStream();
             ReadableWorkbook wb = new ReadableWorkbook(is)) {

            Sheet sheet = wb.getFirstSheet();
            List<Customer> batch = new ArrayList<>();

            try (Stream<Row> rows = sheet.openStream()) {
                rows.forEach(r -> {

                    // Skip header
                    if (r.getRowNum() == 1) return;

                    String name = r.getCellText(0);
                    String nic = r.getCellText(1);

                    // Skip empty rows (Java 8 safe)
                    if (name == null || name.trim().isEmpty() ||
                            nic == null || nic.trim().isEmpty()) {
                        skipped.incrementAndGet();
                        return;
                    }

                    // Skip duplicate NIC
                    if (customerRepo.existsByNic(nic.trim())) {
                        System.out.println("Duplicate NIC skipped: " + nic);
                        skipped.incrementAndGet();
                        return;
                    }

                    LocalDate dob = parseDate(r, 2);

                    // Skip invalid date
                    if (dob == null) {
                        System.out.println("Invalid DOB skipped for NIC: " + nic);
                        skipped.incrementAndGet();
                        return;
                    }

                    Customer c = new Customer();
                    c.setName(name.trim());
                    c.setNic(nic.trim());
                    c.setDob(dob);

                    batch.add(c);
                    saved.incrementAndGet();

                    // Batch insert
                    if (batch.size() >= 1000) {
                        customerRepo.saveAll(batch);
                        batch.clear();
                    }
                });
            }

            // Save remaining
            if (!batch.isEmpty()) {
                customerRepo.saveAll(batch);
            }
        }

        return "Saved: " + saved.get() + " | Skipped: " + skipped.get();
    }


    // BULK UPDATE

    @Transactional
    public String bulkUpdateAdvanced(MultipartFile file) throws Exception {

        try (InputStream is = file.getInputStream();
             ReadableWorkbook wb = new ReadableWorkbook(is)) {

            Sheet sheet = wb.getFirstSheet();

            try (Stream<Row> rows = sheet.openStream()) {
                rows.forEach(r -> {

                    // Skip header
                    if (r.getRowNum() == 0) return;

                    String nic = r.getCellText(1);

                    // 🚫 Skip empty NIC
                    if (nic == null || nic.trim().isEmpty()) return;

                    customerRepo.findByNic(nic.trim()).ifPresent(existingCustomer -> {

                        String name = r.getCellText(0);
                        if (name != null && !name.trim().isEmpty()) {
                            existingCustomer.setName(name.trim());
                        }

                        LocalDate dob = parseDate(r, 2);
                        if (dob != null) {
                            existingCustomer.setDob(dob);
                        }

                        customerRepo.save(existingCustomer);
                    });
                });
            }
        }

        return "Bulk update completed successfully";
    }


    // DATE PARSER

    private LocalDate parseDate(Row row, int index) {
        try {
            Cell cell = row.getCell(index);

            if (cell == null) return null;

            // Handle numeric date (Excel real date)
            if (cell.getType() == CellType.NUMBER) {
                LocalDateTime dt = cell.asDate();
                if (dt != null) return dt.toLocalDate();
            }

            // Handle string date
            String text = row.getCellText(index);

            if (text != null && !text.trim().isEmpty()) {
                return LocalDate.parse(text.trim());
            }

        } catch (Exception e) {
            System.out.println("Date parse error at row: " + row.getRowNum());
        }

        return null;
    }
}