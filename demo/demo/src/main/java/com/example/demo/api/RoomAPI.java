package com.example.demo.api;

import com.example.demo.document.RoomDocument;
import com.example.demo.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/room")
@RequiredArgsConstructor
public class RoomAPI {
    private final RoomService roomService;

    @PostMapping("/management/add")
    public ResponseEntity<RoomDocument> insert(@RequestBody RoomDocument roomDocument) {
        return ResponseEntity.ok(roomService.insert(roomDocument));
    }

    @GetMapping("/management/find-all/{pageNumber}")
    public ResponseEntity<List<RoomDocument>> findAll(@PathVariable("pageNumber") int pageNumber) {
        return ResponseEntity.ok(roomService.findAll(pageNumber));
    }

    @GetMapping("/management/count-all")
    public ResponseEntity<Map<String, Long>> countAll() {
        Map<String, Long> mp = new HashMap<>();
        mp.put("total", roomService.countAll());
        return ResponseEntity.ok(mp);
    }

    @PutMapping("/management/update")
    public void update(@RequestBody RoomDocument roomDocument) {
        roomService.update(roomDocument);
    }

    @DeleteMapping("/management/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        roomService.delete(id);
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<RoomDocument>> findAll() {
        return ResponseEntity.ok(roomService.findAll());
    }
}
