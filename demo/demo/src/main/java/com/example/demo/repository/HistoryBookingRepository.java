package com.example.demo.repository;

import com.example.demo.document.HistoryBookingDocument;
import com.example.demo.dto.BookingError;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HistoryBookingRepository extends MongoRepository<HistoryBookingDocument, String> {
    HistoryBookingDocument insert(HistoryBookingDocument historyBookingDocument);
    List<HistoryBookingDocument> findAll();
    Page<HistoryBookingDocument> findAll(Pageable pageable);

    @Aggregation(pipeline = {
            "{ $match: { date: ?0, roomId: ?1 } }",
            "{ $project: { date: '$date', mtch: { $cond: { if: { $or: [ { $and: [{ $lte: ['$startTime', ?3] }, { $gte: ['$endTime', ?3] }] }, { $and: [{ $lte: ['$startTime', ?2] }, { $gte: ['$endTime', ?2] }] } ]}, then: false, else: true } } } }",
            "{ $group: { _id: '$date', answer: { $min: '$mtch' } } }"
    })
    BookingError check(String date, String roomId, String startTime, String endTime);
}
