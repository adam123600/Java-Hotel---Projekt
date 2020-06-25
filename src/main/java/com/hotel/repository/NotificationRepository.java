package com.hotel.repository;


import com.hotel.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Repository
@CrossOrigin
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByNotType_id(Long NotificationType_id);
    List<Notification> findByRoom_id(Long Room_id);
    Optional<List<Notification>> findByRoom_roomName(String roomName);
    void deleteById(Long id);

}
