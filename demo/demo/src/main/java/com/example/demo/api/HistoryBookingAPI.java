package com.example.demo.api;

import com.example.demo.document.HistoryBookingDocument;
import com.example.demo.dto.History;
import com.example.demo.service.HistoryBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/v1/history")
@RequiredArgsConstructor
public class HistoryBookingAPI {
    private final HistoryBookingService historyBookingService;

    @PostMapping("/booking")
    public ResponseEntity<HistoryBookingDocument> insert(@RequestBody HistoryBookingDocument historyBookingDocument) {
        HistoryBookingDocument temp = historyBookingService.insert(historyBookingDocument);
        return temp != null ? ResponseEntity.ok(temp) : ResponseEntity.status(HttpStatus.FOUND).build();
    }

    @GetMapping("/management/export-excel")
    public ResponseEntity<Resource> exportToExcel() throws IOException {
        String filePath = historyBookingService.exportDataToExcel();
        Path path = Paths.get(filePath);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

    }


    @GetMapping("/find-all")
    public ResponseEntity<List<History>> findAll() {
        return ResponseEntity.ok(historyBookingService.findAll());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        historyBookingService.delete(id);
    }
    @PutMapping("/update")
    public void update(@RequestBody HistoryBookingDocument historyBookingDocument) {
        historyBookingService.update(historyBookingDocument);
    }
}
