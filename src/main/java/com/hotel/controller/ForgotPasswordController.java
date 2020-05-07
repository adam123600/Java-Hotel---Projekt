package com.hotel.controller;

import com.hotel.payload.request.LoginRequest;
import com.hotel.payload.response.MessageResponse;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/userpassword")
public class ForgotPasswordController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/forgotpassword")
    public ResponseEntity<?> forgotUserPassword( @RequestBody LoginRequest loginRequest) {
        if (!userRepository.existsByUsername(loginRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("ERROR: There is no such user!!"));
        }
        else {
            return ResponseEntity.ok(new MessageResponse("Username exists in database"));
        }
    }

}
