package com.hotel.repository;

import com.hotel.model.RoomStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomStandardRepository extends JpaRepository<RoomStandard, Long> {
}
