package com.example.demo.service;

import com.example.demo.document.RoomDocument;
import com.example.demo.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomDocument insert(RoomDocument roomDocument) {
        return roomRepository.insert(roomDocument);
    }

    public List<RoomDocument> findAll(Integer pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, 3);
        Page<RoomDocument> page = roomRepository.findAll(pageable);
        return page.getContent();
    }

    public Long countAll() {
        return roomRepository.count();
    }

    public void update(RoomDocument roomDocument) {
        roomRepository.save(roomDocument);
    }

    public void delete(String id) {
        roomRepository.deleteById(id);
    }

    public List<RoomDocument> findAll() {
        return roomRepository.findAll();
    }
}
