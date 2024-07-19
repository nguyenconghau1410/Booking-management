package com.example.demo.document;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "history-document")
@Data
public class HistoryBookingDocument {
    private String id;
    private String userId;
    private String roomId;
    private String description;
    private String date;
    private String startTime;
    private String endTime;
}
