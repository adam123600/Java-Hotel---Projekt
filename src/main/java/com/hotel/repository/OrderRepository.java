package com.hotel.repository;

import com.hotel.model.Item;
import com.hotel.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByItemIs(Item item);
}
