package com.example.demo.api;

import com.example.demo.document.RoleDocument;
import com.example.demo.document.UserDocument;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class Test {
    private final RoleService roleService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok(passwordEncoder.encode("12345678"));
    }

    @GetMapping("/change")
    public void change() {
        userService.change();
    }
}
