package com.example.demo.api;

import com.example.demo.document.UserDocument;
import com.example.demo.dto.Token;
import com.example.demo.security.JwtService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserAPI {
    private final UserService userService;
    private final JwtService jwtService;
    @PostMapping("/auth/login")
    public ResponseEntity<Token> login(@RequestBody Map<String, String> mp) {
        return ResponseEntity.ok(userService.login(mp));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Token> register(@RequestBody UserDocument userDocument) {
        return ResponseEntity.ok(userService.register(userDocument));
    }

    @GetMapping("/management/count-all")
    public ResponseEntity<Map<String, Long>> countAll() {
        Map<String, Long> mp = new HashMap<>();
        mp.put("total", userService.countAll());
        return ResponseEntity.ok(mp);
    }

    @GetMapping("/management/find-all/{pageNumber}")
    public ResponseEntity<List<UserDocument>> findAll(@PathVariable("pageNumber") Integer pageNumber) {
        return ResponseEntity.ok(userService.findAll(pageNumber));
    }

    @GetMapping("/findOne")
    public ResponseEntity<UserDocument> findOne(@RequestHeader("Authorization") String header) {
        String username = jwtService.extractUsername(header.substring(7));
        if(username != null) {
            UserDocument userDocument = userService.findOne(username);
            return userDocument != null ? ResponseEntity.ok(userDocument) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping("/management/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        userService.delete(id);
    }
}
