package com.hotel.controller;

import com.hotel.model.User;
import com.hotel.payload.request.ChangePasswordRequest;
import com.hotel.payload.request.SignupRequest;
import com.hotel.payload.response.MessageResponse;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @RequestMapping(value = "{id}/changePassword", method = RequestMethod.PUT)
    public ResponseEntity<MessageResponse> updateUser(@PathVariable Long id, @Valid @RequestBody ChangePasswordRequest newPassword){

        User userToUpdate= userRepository.getOne(id);
        userToUpdate.setPassword(encoder.encode(newPassword.getPassword()));

        userRepository.save(userToUpdate);
        return ResponseEntity.ok(new MessageResponse("Hasło zostało zmienione!"));
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
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

        userRepository.saveAndFlush(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}