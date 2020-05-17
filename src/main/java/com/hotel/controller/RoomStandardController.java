//package com.hotel.controller;
//
//import com.hotel.model.RoomStandard;
//import com.hotel.repository.RoomStandardRepository;
//import org.springframework.beans.BeanUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/rooms/roomstandards")
//public class RoomStandardController {
//    @Autowired
//    private RoomStandardRepository roomStandardRepository;
//
//    @GetMapping
//    public List<RoomStandard> getAllRoomStandards() {
//        return roomStandardRepository.findAll();
//    }
//
//    @GetMapping
//    @RequestMapping("{id}")
//    public RoomStandard getRoomStandardById(@PathVariable Long id) {
//        return roomStandardRepository.getOne(id);
//    }
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public RoomStandard addNewRoomStandard(@RequestBody final RoomStandard roomStandard) {
//        return roomStandardRepository.saveAndFlush(roomStandard);
//    }
//
//    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteRoomStandardById(@PathVariable Long id) {
//        roomStandardRepository.deleteById(id);
//    }
//
//    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public RoomStandard updateRoomStandard(@PathVariable Long id, @Valid @RequestBody RoomStandard roomStandard) {
//        RoomStandard existingRoomStandard = roomStandardRepository.getOne(id);
//        BeanUtils.copyProperties(roomStandard, existingRoomStandard, "id");
//        return roomStandardRepository.saveAndFlush(existingRoomStandard);
//    }
//}
