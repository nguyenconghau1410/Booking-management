package com.example.demo.repository;

import com.example.demo.document.DayOffDocument;
import com.example.demo.document.RoomDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DayOffRepository extends MongoRepository<DayOffDocument, String> {
    DayOffDocument insert(DayOffDocument dayOffDocument);
    Page<DayOffDocument> findAll(Pageable pageable);
}
