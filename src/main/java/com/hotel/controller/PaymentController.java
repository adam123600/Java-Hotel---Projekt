package com.hotel.controller;

import com.hotel.model.hoursPayment;
import com.hotel.model.paymentsPayment;
import com.hotel.model.ratePayment;
import com.hotel.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * /api/payments/allrates       ALL RATES
 * /api/payments/allhours       ALL HOURS
 * /api/payments/allpayments    ALL PAYMENTS
 * /api/payments/hours/{id}     Hours of {id} user
 * /api/payments/payments/{id}  Payments of {id} user
 * /api/payments/rate/{id}      Rate of {id} user
 */


@RestController
@RequestMapping("/api/payments")

public class PaymentController {

    @Autowired
    HoursPaymentRepository hoursPaymentRepository;

    @Autowired
    RatePaymentRepository ratePaymentRepository;

    @Autowired
    PaymentPaymentRepository paymentPaymentRepository;

    @GetMapping("/allrates")
    public List<ratePayment> getAllRates()
    {
        return ratePaymentRepository.findAll();
    }

    @GetMapping("/allhours")
    public List<hoursPayment> getAllHours()
    {
        return hoursPaymentRepository.findAll();
    }

    @GetMapping("/allpayments")
    public List<paymentsPayment> getAllPayment()
    {
        return paymentPaymentRepository.findAll();
    }

    @GetMapping("/hours/{id}")
    public List<hoursPayment> getHoursPaymentById(@PathVariable Long id) {
        return hoursPaymentRepository.findByUser_id(id);
    }

    @GetMapping("/payments/{id}")
    public List<paymentsPayment> getPaymentsPaymentById(@PathVariable Long id) {
        return paymentPaymentRepository.findByUser_id(id);
    }

    @GetMapping("/rate/{id}")
    public List<ratePayment> getRatesPaymentById(@PathVariable Long id) {
        return ratePaymentRepository.findByUser_id(id);
    }
}
