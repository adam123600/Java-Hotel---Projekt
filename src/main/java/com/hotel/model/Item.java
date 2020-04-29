package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Model Itemu w bazie danych
 */

@Entity
@Table(name = "items")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long item_id;

    @Column(length = 80,nullable = false)
    @Size(max = 80)
    @NotBlank
    private String item_name;

    @Column(nullable = false)
    private Integer min_quantity;

    @Enumerated(EnumType.STRING)
    @Column(length = 30, nullable = false)
    private EItem item_category;

    public Item() {
    }

    public Item(String itemName, Integer minQuantity, EItem itemCategory){
        this.item_category = itemCategory;
        this.min_quantity = minQuantity;
        this.item_name = itemName;
    }

    public EItem getItem_category() {
        return item_category;
    }

    public void setItem_category(EItem item_category) {
        this.item_category = item_category;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public Integer getMin_quantity() {
        return min_quantity;
    }

    public void setMin_quantity(Integer min_quantity) {
        this.min_quantity = min_quantity;
    }

    public Long getItem_id() {
        return item_id;
    }

    public void setItem_id(Long item_id) {
        this.item_id = item_id;
    }
}
