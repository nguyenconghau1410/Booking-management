package com.example.demo.document;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "room")
@Data
public class RoomDocument {
    private String id;
    private String name;
    private Integer capacity;
    private String description;
    private boolean active;
}
