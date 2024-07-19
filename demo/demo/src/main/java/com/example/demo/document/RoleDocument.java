package com.example.demo.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "role")
@Data
public class RoleDocument {
    @Id
    private String id;
    private String name;
    private String code;
}
