package com.hotel.controller;



import com.hotel.model.Room;
import com.hotel.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping ("/api/rooms1")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;



    @GetMapping
    public List<Room> myGetAllRooms(){
        return roomRepository.findAll();
    }

    @GetMapping("standard/{id}")
    public List<Room> getAllRoomsByRoomStandardId(@PathVariable Long id){
        return roomRepository.findByRoomStandard_id(id);
    }
}
