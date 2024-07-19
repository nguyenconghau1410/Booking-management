package com.example.demo.service;

import com.example.demo.document.HistoryBookingDocument;
import com.example.demo.document.RoomDocument;
import com.example.demo.document.UserDocument;
import com.example.demo.dto.BookingError;
import com.example.demo.dto.History;
import com.example.demo.repository.HistoryBookingRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HistoryBookingService {
    private final HistoryBookingRepository historyBookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    public HistoryBookingDocument insert(HistoryBookingDocument historyBookingDocument) {
        BookingError bookingError = historyBookingRepository.check(historyBookingDocument.getDate(),
                historyBookingDocument.getRoomId(), historyBookingDocument.getStartTime(), historyBookingDocument.getEndTime());
        if(bookingError == null) {
            return historyBookingRepository.insert(historyBookingDocument);
        }
        else {
            if(bookingError.isAnswer()) {
                return historyBookingRepository.insert(historyBookingDocument);
            }
        }
        return null;
    }

    public List<History> findAll() {
        List<HistoryBookingDocument> list = historyBookingRepository.findAll();
        List<History> mains = new ArrayList<>();
        for (HistoryBookingDocument x : list) {
            UserDocument u = userRepository.findById(x.getUserId()).get();
            RoomDocument r = roomRepository.findById(x.getRoomId()).get();
            mains.add(new History().convert(x, u, r));
        }
        return mains;
    }

    public String exportDataToExcel() throws IOException {
        List<HistoryBookingDocument> list = historyBookingRepository.findAll();
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data");

        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("id");
        header.createCell(1).setCellValue("userId");
        header.createCell(2).setCellValue("roomId");
        header.createCell(3).setCellValue("description");
        header.createCell(4).setCellValue("date");
        header.createCell(5).setCellValue("startTime");
        header.createCell(6).setCellValue("endTime");

        int rowNum = 1;
        for(HistoryBookingDocument x : list) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(x.getId());
            row.createCell(1).setCellValue(x.getUserId());
            row.createCell(2).setCellValue(x.getRoomId());
            row.createCell(3).setCellValue(x.getDescription());
            row.createCell(4).setCellValue(x.getDate());
            row.createCell(5).setCellValue(x.getStartTime());
            row.createCell(6).setCellValue(x.getEndTime());
        }

        String fileName = "excel_export_" + UUID.randomUUID().toString() + ".xlsx";
        String filePath = "./folder/" + fileName;

        try (FileOutputStream outputStream = new FileOutputStream(filePath)) {
            workbook.write(outputStream);
        }

        workbook.close();
        return filePath;
    }

    public List<HistoryBookingDocument> findAll(int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, 3, Sort.by("date").descending());
        Page<HistoryBookingDocument> page = historyBookingRepository.findAll(pageable);
        return page.getContent();
    }

    public Long countAll() {
        return historyBookingRepository.count();
    }

    public void update(HistoryBookingDocument historyBookingDocument) {
        historyBookingRepository.save(historyBookingDocument);
    }

    public void delete(String id) {
        historyBookingRepository.deleteById(id);
    }
}
