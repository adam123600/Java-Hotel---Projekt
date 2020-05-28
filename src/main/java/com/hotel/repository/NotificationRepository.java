package com.hotel.repository;


import com.hotel.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByNotType_id(Long NotificationType_id);
    List<Notification> findByRoom_id(Long Room_id);
    void deleteById(Long id);

}
