package com.hotel.controller;

import com.hotel.model.Item;
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
@RequestMapping
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @RequestMapping(value = "/api/users/{id}/changePassword", method = RequestMethod.PUT)
    public ResponseEntity<MessageResponse> updateUser(@PathVariable Long id, @Valid @RequestBody ChangePasswordRequest newPassword){

        User userToUpdate= userRepository.getOne(id);
        userToUpdate.setPassword(encoder.encode(newPassword.getPassword()));

        userRepository.save(userToUpdate);
        return ResponseEntity.ok(new MessageResponse("Hasło zostało zmienione!"));
    }

    @GetMapping
    @RequestMapping("{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.getOne(id);
    }


}