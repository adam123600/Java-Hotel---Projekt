//package com.hotel.controller;
//
//import com.hotel.model.Reservation;
//import com.hotel.repository.ReservationRepository;
//import org.springframework.beans.BeanUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/reservations")
//public class ReservationController {
//    @Autowired
//    private ReservationRepository reservationRepository;
//
//    @GetMapping
//    public List<Reservation> getAllReservations() {
//        return reservationRepository.findAll();
//    }
//
//    @GetMapping
//    @RequestMapping("{id}")
//    public Reservation getRservationById(@PathVariable Long id) {
//        return reservationRepository.getOne(id);
//    }
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public Reservation addNewReservation(@RequestBody final Reservation reservation) {
//        return reservationRepository.saveAndFlush(reservation);
//    }
//
//    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteReservationById(@PathVariable Long id) {
//        reservationRepository.deleteById(id);
//    }
//
//    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public Reservation updateReservation(@PathVariable Long id, @Valid @RequestBody Reservation reservation) {
//        Reservation existingReservation = reservationRepository.getOne(id);
//        BeanUtils.copyProperties(reservation, existingReservation, "id");
//        return reservationRepository.saveAndFlush(existingReservation);
//    }
//}
