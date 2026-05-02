package com.Jawahar.customer_management_backend.util;

import org.apache.poi.ss.usermodel.Cell;

public class ExcelHelper {

    public static String getString(Cell cell) {
        if (cell == null) return "";

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();

            case NUMERIC:
                return String.valueOf((long) cell.getNumericCellValue());

            default:
                return "";
        }
    }
}