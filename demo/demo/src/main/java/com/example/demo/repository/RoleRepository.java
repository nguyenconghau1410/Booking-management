package com.example.demo.repository;

import com.example.demo.document.RoleDocument;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RoleRepository extends MongoRepository<RoleDocument, String> {
    RoleDocument insert(RoleDocument roleDocument);
    RoleDocument findByCode(String code);
}
