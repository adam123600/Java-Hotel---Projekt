package com.hotel.repository;

import com.hotel.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findByServiceType_id(Long ServiceType_id);
    List<Service> findByRoom_id(Long Room_id);
    void deleteById(Long id);
}
