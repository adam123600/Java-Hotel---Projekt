//package com.hotel.controller;
//
//import com.hotel.model.Room;
//import com.hotel.repository.RoomRepository;
//import org.springframework.beans.BeanUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/rooms")
//public class RoomController {
//    @Autowired
//    private RoomRepository roomRepository;
//
//    @GetMapping
//    public List<Room> getAllRooms() {
//        return roomRepository.findAll();
//    }
//
//    @GetMapping
//    @RequestMapping("{id}")
//    public Room getRoomById(@PathVariable Long id) {
//        return roomRepository.getOne(id);
//    }
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public Room addNewRoom(@RequestBody final Room room) {
//        return roomRepository.saveAndFlush(room);
//    }
//
//    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteRoomById(@PathVariable Long id) {
//        roomRepository.deleteById(id);
//    }
//
//    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public Room updateRoom(@PathVariable Long id, @Valid @RequestBody Room room) {
//        Room existingRoom = roomRepository.getOne(id);
//        BeanUtils.copyProperties(room, existingRoom, "id");
//        return roomRepository.saveAndFlush(existingRoom);
//    }
//}
