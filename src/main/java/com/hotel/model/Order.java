package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

/**
 * Model Zamówienia w bazie danych
 */

@Entity
@Table(name = "orders")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_id;

    @Column
    private Float price;

    @Column(nullable = false)
    @Type(type="date")
    private Date orderDate;

    @Column(nullable = false)
    private Integer itemCounter;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    public Order() {
    }

    public Order(Long order_id, Float price, Date orderDate, Integer itemCounter, Item item) {
        this.order_id = order_id;
        this.price = price;
        this.orderDate = orderDate;
        this.itemCounter = itemCounter;
        this.item = item;
    }

    public Long getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Long order_id) {
        this.order_id = order_id;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Integer getItemCounter() {
        return itemCounter;
    }

    public void setItemCounter(Integer itemCounter) {
        this.itemCounter = itemCounter;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
