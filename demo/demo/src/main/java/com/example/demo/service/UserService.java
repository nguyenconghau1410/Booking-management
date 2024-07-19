package com.example.demo.service;

import com.example.demo.document.RoleDocument;
import com.example.demo.document.UserDocument;
import com.example.demo.dto.Token;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailService userDetailService;

    public void change() {
        UserDocument userDocument = userRepository.findByUsername("tien1511").get();
        RoleDocument roleDocument = roleRepository.findByCode("ADMIN");
        userDocument.setRole(roleDocument);
        userRepository.save(userDocument);
    }

    public Token login(Map<String, String> mp) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        mp.get("username"),
                        mp.get("password")
                )
        );
        var user = userDetailService.loadUserByUsername(mp.get("username"));
        var access_token = jwtService.generateToken(user);
        return Token.builder().access_token(access_token).build();
    }

    public Token register(UserDocument userDocument) {
        Optional<UserDocument> existingUser = userRepository.findByUsername(userDocument.getUsername());
        if(existingUser.isPresent()) {
            return null;
        }
        userDocument.setPassword(passwordEncoder.encode(userDocument.getPassword()));
        userDocument.setRole(roleRepository.findByCode("USER"));
        userRepository.save(userDocument);
        var user = userDetailService.loadUserByUsername(userDocument.getUsername());
        var access_token = jwtService.generateToken(user);
        return Token.builder().access_token(access_token).build();
    }

    public List<UserDocument> findAll(Integer pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, 2);
        Page<UserDocument> page = userRepository.findAll(pageable);
        return page.getContent();
    }

    public Long countAll() {
        return userRepository.count();
    }

    public UserDocument findOne(String username) {
        Optional<UserDocument> userDocument = userRepository.findByUsername(username);
        if(userDocument.isPresent())
            return userDocument.get();
        return null;
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }
}
