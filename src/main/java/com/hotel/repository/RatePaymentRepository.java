package com.hotel.repository;

import com.hotel.model.ratePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatePaymentRepository extends JpaRepository<ratePayment, Long>{

    List<ratePayment> findByUser_id(Long User_id);
    void deleteById(Long id);
}
