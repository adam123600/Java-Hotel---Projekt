package com.hotel.controller;


import com.hotel.model.Item;
import com.hotel.model.Order;
import com.hotel.repository.ItemRepository;
import com.hotel.repository.OrderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/orders1")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ItemRepository itemRepository;


    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping
    @RequestMapping("{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderRepository.getOne(id);
    }

    @GetMapping("item/{id}")
    public Order getItemOfOrder(@PathVariable Long id){
        Item item = itemRepository.getOne(id);
        return orderRepository.findByItemIs(item);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Order addNewOrder(@RequestBody final Order order){
        return orderRepository.saveAndFlush(order);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrderById(@PathVariable Long id){
        orderRepository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Order updateOrder(@PathVariable Long id, @Valid @RequestBody Order order){
        Order existingOrder = orderRepository.getOne(id);
        BeanUtils.copyProperties(order, existingOrder,"order_id");
        return orderRepository.saveAndFlush(existingOrder);
    }
}
