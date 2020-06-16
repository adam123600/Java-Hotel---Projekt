package com.hotel.repository;

import com.hotel.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
    Optional<Guest> findFirstByRoom_idOrderByCheckOutDateDesc(Long id);   // znajduje gościa, który zostaje w pokoju najdłużej
    Guest findFirstByOrderByCheckOutDate();
    Optional<List<Guest>> findByLastName(String lastName);
}
