package com.hotel.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.hotel.model.*;
import com.hotel.payload.request.*;
import com.hotel.payload.response.*;
import com.hotel.repository.*;
import com.hotel.security.jwt.JwtUtils;
import com.hotel.security.service.UserDetailsImpl;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }


    @PostMapping(value= "/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstname(),
                signUpRequest.getLastname(),
                signUpRequest.getPhonenumber());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_RECEPTIONIST)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }else{
            strRoles.forEach(role -> {
                switch (role) {
                    case "ROLE_RECEPTIONIST":
                    case "receptionist":
                        Role receptionistRole = roleRepository.findByName(ERole.ROLE_RECEPTIONIST)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(receptionistRole);
                        break;
                    case "accountant":
                    case "ROLE_ACCOUNTANT":
                        Role accountantRole = roleRepository.findByName(ERole.ROLE_ACCOUNTANT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(accountantRole);
                        break;
                    case "cleaner":
                    case "ROLE_CLEANER":
                        Role cleanerRole = roleRepository.findByName(ERole.ROLE_CLEANER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(cleanerRole);
                        break;
                    case "butler":
                    case "ROLE_BUTLER":
                        Role butlerRole = roleRepository.findByName(ERole.ROLE_BUTLER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(butlerRole);
                        break;
                    case "manager":
                    case "ROLE_MANAGER":
                        Role managerRole = roleRepository.findByName(ERole.ROLE_MANAGER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(managerRole);
                        break;
                    case "kitchen_manager":
                    case "ROLE_KITCHEN_MANAGER":
                        Role kitchenManagerRole = roleRepository.findByName(ERole.ROLE_KITCHEN_MANAGER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(kitchenManagerRole);
                        break;
                    case "repairman":
                    case "ROLE_REPAIRMAN":
                        Role repairManRole = roleRepository.findByName(ERole.ROLE_REPAIRMAN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(repairManRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_RECEPTIONIST)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Pomyślnie dodano użytkownika!"));
    }


}