package com.example.demo.api;

import com.example.demo.document.DayOffDocument;
import com.example.demo.document.RoomDocument;
import com.example.demo.repository.DayOffRepository;
import com.example.demo.service.DayOffService;
import com.example.demo.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dayoff")
@RequiredArgsConstructor
public class DayOffAPI {

    private final DayOffService dayOffService;

    @PostMapping("/management/add")
    public ResponseEntity<DayOffDocument> insert(@RequestBody DayOffDocument dayOffDocument) {
        return ResponseEntity.ok(dayOffService.insert(dayOffDocument));
    }

    @GetMapping("/management/find-all/{pageNumber}")
    public ResponseEntity<List<DayOffDocument>> findAll(@PathVariable("pageNumber") int pageNumber) {
        return ResponseEntity.ok(dayOffService.findAll(pageNumber));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<DayOffDocument>> findAll() {
        return ResponseEntity.ok(dayOffService.findAll());
    }

    @GetMapping("/management/count-all")
    public ResponseEntity<Map<String, Long>> countAll() {
        Map<String, Long> mp = new HashMap<>();
        mp.put("total", dayOffService.countAll());
        return ResponseEntity.ok(mp);
    }

    @PutMapping("/management/update")
    public void update(@RequestBody DayOffDocument dayOffDocument) {
        dayOffService.update(dayOffDocument);
    }

    @DeleteMapping("/management/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        dayOffService.delete(id);
    }
}
