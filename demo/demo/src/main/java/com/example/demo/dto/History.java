package com.example.demo.dto;

import com.example.demo.document.HistoryBookingDocument;
import com.example.demo.document.RoomDocument;
import com.example.demo.document.UserDocument;
import lombok.Data;

@Data
public class History {
    private String id;
    private RoomDocument room;
    private UserDocument user;
    private String description;
    private String date;
    private String startTime;
    private String endTime;

    public History convert(HistoryBookingDocument h1, UserDocument u1, RoomDocument r1) {
        History history = new History();
        history.setId(h1.getId());
        history.setDate(h1.getDate());
        history.setDescription(h1.getDescription());
        history.setStartTime(h1.getStartTime());
        history.setEndTime(h1.getEndTime());
        history.setUser(u1);
        history.setRoom(r1);
        return history;
    }
}
