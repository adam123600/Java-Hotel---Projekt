package com.hotel.controller;

import com.hotel.model.Guest;
import com.hotel.repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping ("/api/guests1")
public class GuestController {

    @Autowired
    private GuestRepository guestRepository;

    @GetMapping
    public List<Guest> myGetAllRooms(){
        return guestRepository.findAll();
    }
}
