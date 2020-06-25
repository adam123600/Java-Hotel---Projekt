package com.hotel.controller;

import com.hotel.model.Notification;
import com.hotel.payload.request.LoginRequest;
import com.hotel.payload.response.MessageResponse;
import com.hotel.repository.NotificationRepository;
import com.hotel.repository.NotificationTypeRepository;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    NotificationTypeRepository notificationTypeRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Notification addNewNotification(@RequestBody final Notification notification ){
        return notificationRepository.saveAndFlush(notification);
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<?> forgotUserPassword(@RequestBody LoginRequest loginRequest) {
        if (!userRepository.existsByUsername(loginRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("ERROR: There is no such user! Please enter a valid name"));
        }

        //create new notification
        Notification notification = new Notification(loginRequest.getUsername(), notificationTypeRepository.findByType("RES_USER_PASSWORD"));
        notificationRepository.save(notification);

        return ResponseEntity.ok(new MessageResponse("Request was sent successfully"));
    }

    @GetMapping
    public List<Notification> getAllNotifications(){
        return notificationRepository.findAll();
    }

    // zwraca wszystkie notyfikacje dla danego typu notyfikacjii, np dla "resetowania hasla" , jesli wpiszemy
    // /api/notifications/1 to dostaniemy wszystkie notyfikacje ktore maja taki typ itd.
    @GetMapping("type/{notTypeId}")
    public List<Notification> getAllNotificationsByNotificationTypeId(@PathVariable Long notTypeId){
        return notificationRepository.findByNotType_id(notTypeId);
    }

    @GetMapping("room/{roomId}")
    public List<Notification> getAllNotificationsByRoomId(@PathVariable Long roomId){
        return notificationRepository.findByRoom_id(roomId);
    }

    @GetMapping({"id"})
    public Notification getNotificationById(@PathVariable Long id){
        return notificationRepository.getOne(id);
    }

    @DeleteMapping("{id}")
    public void deleteNotificationById(@PathVariable Long id){
        notificationRepository.deleteById(id);
    }




}
