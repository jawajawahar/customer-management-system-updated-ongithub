package com.Jawahar.customer_management_backend.controller;

import com.Jawahar.customer_management_backend.service.BulkService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/bulk")
@CrossOrigin
public class BulkController {

    @Autowired
    private BulkService bulkService;


    // BULK CREATE

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(bulkService.processExcel(file));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 🔥 BULK UPDATE ADVANCED

    @PostMapping("/update-advanced")
    public ResponseEntity<?> updateAdvanced(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(bulkService.bulkUpdateAdvanced(file));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}