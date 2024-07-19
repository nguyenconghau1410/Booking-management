package com.example.demo.repository;

import com.example.demo.document.RoomDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoomRepository extends MongoRepository<RoomDocument, String> {
    RoomDocument insert(RoomDocument roomDocument);
    Page<RoomDocument> findAll(Pageable pageable);
    List<RoomDocument> findAll();
}
