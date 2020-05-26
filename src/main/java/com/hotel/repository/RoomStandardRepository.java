package com.hotel.repository;

import com.hotel.model.RoomStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
public interface RoomStandardRepository extends JpaRepository<RoomStandard, Long> {
}
