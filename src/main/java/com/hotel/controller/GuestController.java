//package com.hotel.controller;
//
//import com.hotel.model.Guest;
//import com.hotel.repository.GuestRepository;
//import org.springframework.beans.BeanUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/guests")
//public class GuestController {
//    @Autowired
//    private GuestRepository guestRepository;
//
//    @GetMapping
//    public List<Guest> getAllGuests() {
//        return guestRepository.findAll();
//    }
//
//    @GetMapping
//    @RequestMapping("{id}")
//    public Guest getGuestById(@PathVariable Long id) {
//        return guestRepository.getOne(id);
//    }
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public Guest addNewGuest(@RequestBody final Guest guest) {
//        return guestRepository.saveAndFlush(guest);
//    }
//
//    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteGuestById(@PathVariable Long id) {
//        guestRepository.deleteById(id);
//    }
//
//    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public Guest updateGuest(@PathVariable Long id, @Valid @RequestBody Guest guest) {
//        Guest existingGuest = guestRepository.getOne(id);
//        BeanUtils.copyProperties(guest, existingGuest, "id");
//        return guestRepository.saveAndFlush(existingGuest);
//    }
//}
