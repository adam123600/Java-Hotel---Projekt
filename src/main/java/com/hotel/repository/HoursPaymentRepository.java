package com.hotel.repository;

import com.hotel.model.hoursPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoursPaymentRepository extends JpaRepository<hoursPayment, Long>{

    List<hoursPayment> findByUser_id(Long User_id);
    void deleteById(Long id);
}
