package com.Jawahar.customer_management_backend;

import com.Jawahar.customer_management_backend.repository.CustomerRepository;
import com.Jawahar.customer_management_backend.service.BulkService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.ByteArrayOutputStream;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BulkServiceTest {

    @Mock
    private CustomerRepository customerRepo;

    @InjectMocks
    private BulkService bulkService;

    @Test
    public void testProcessExcel_Success() throws Exception {
        // 1. Create a valid minimal Excel file in memory
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            workbook.createSheet("Customers"); // Create at least one sheet
            workbook.write(out);
        }
        byte[] content = out.toByteArray();

        // 2. Create the MockMultipartFile with the valid content
        MockMultipartFile file = new MockMultipartFile("file", "test.xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", content);

        // 3. Execute the service
        bulkService.processExcel(file);

        // 4. Verify interaction
        verify(customerRepo, atMostOnce()).saveAll(anyList());
    }
}