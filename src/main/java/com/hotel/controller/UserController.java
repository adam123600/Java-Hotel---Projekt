package com.hotel.controller;

import com.hotel.model.User;
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

    @GetMapping
    public List<User> getAllItems(){
        return userRepository.findAll();
    }

    @RequestMapping(value = "{id}/change_password", method = RequestMethod.PUT)
    public ResponseEntity<MessageResponse> changePassword(@PathVariable Long id, @Valid @RequestBody User user){

        User userToChangePassword = userRepository.getOne(id);
        userToChangePassword.setPassword(encoder.encode(user.getPassword()));

        userRepository.save(userToChangePassword);
        return ResponseEntity.ok(new MessageResponse("Hasło zostało zmienione!"));
    }
}
