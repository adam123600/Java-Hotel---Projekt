package com.hotel.repository;

import com.hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
    List<Room> findByRoomStandard_id(Long RoomStandard_id);
    Optional<Room> findByRoomName(String roomName);
    Optional<List<Room>> findByCurrentNumberOfGuests(Integer num);
}
