package com.example.demo.document;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "day-off")
@Data
public class DayOffDocument {
    private String id;
    private String name;
    private String description;
    private String startDay;
    private String endDay;
}
