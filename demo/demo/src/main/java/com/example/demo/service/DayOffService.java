package com.example.demo.service;

import com.example.demo.document.DayOffDocument;
import com.example.demo.document.RoomDocument;
import com.example.demo.repository.DayOffRepository;
import com.example.demo.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DayOffService {
    private final DayOffRepository dayOffRepository;


    public DayOffDocument insert(DayOffDocument dayOffDocument) {
        return dayOffRepository.insert(dayOffDocument);
    }

    public List<DayOffDocument> findAll(Integer pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, 3);
        Page<DayOffDocument> page = dayOffRepository.findAll(pageable);
        return page.getContent();
    }

    public List<DayOffDocument> findAll() {
        return dayOffRepository.findAll();
    }

    public Long countAll() {
        return dayOffRepository.count();
    }

    public void update(DayOffDocument dayOffDocument) {
        dayOffRepository.save(dayOffDocument);
    }

    public void delete(String id) {
        dayOffRepository.deleteById(id);
    }
}
