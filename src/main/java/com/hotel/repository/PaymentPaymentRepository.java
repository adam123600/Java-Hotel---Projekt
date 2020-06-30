package com.hotel.repository;

import com.hotel.model.paymentsPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentPaymentRepository extends JpaRepository<paymentsPayment, Long>{
    List<paymentsPayment> findByUser_id(Long User_id);
    void deleteById(Long id);
}
