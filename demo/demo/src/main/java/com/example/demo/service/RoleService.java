package com.example.demo.service;

import com.example.demo.document.RoleDocument;
import com.example.demo.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    public RoleDocument insert(RoleDocument roleDocument) {
        return roleRepository.insert(roleDocument);
    }

    public RoleDocument findByCode(String code) {
        return roleRepository.findByCode(code);
    }
}
