package com.example.demo.repository;

import com.example.demo.document.UserDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserDocument, String> {
    UserDocument insert(UserDocument userDocument);
    Optional<UserDocument> findByUsername(String username);

    Page<UserDocument> findAll(Pageable pageable);
}
