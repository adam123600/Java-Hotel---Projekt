package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Column(nullable = false)
    private Integer current_quantity;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "item_category",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<ItemCategory> category = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    private List<Order> order;


    public Item() {
    }

    public Item(String itemName, Integer minQuantity, Integer current_quantity){
        this.current_quantity = current_quantity;
        this.min_quantity = minQuantity;
        this.item_name = itemName;
    }

    public Item(Long item_id, @Size(max = 80) @NotBlank String item_name, Integer min_quantity, Integer current_quantity, Set<ItemCategory> category, List<Order> order) {
        this.item_id = item_id;
        this.item_name = item_name;
        this.min_quantity = min_quantity;
        this.current_quantity = current_quantity;
        this.category = category;
        this.order = order;
    }

    public Set<ItemCategory> getCategory() {
        return category;
    }

    public void setCategory(Set<ItemCategory> category) {
        this.category = category;
    }

   /* public EItem getItem_category() {
        return item_category;
    }

    public void setItem_category(EItem item_category) {
        this.item_category = item_category;
    }*/

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

    public Integer getCurrent_quantity() {
        return current_quantity;
    }

    public void setCurrent_quantity(Integer current_quantity) {
        this.current_quantity = current_quantity;
    }

    public List<Order> getOrder() {
        return order;
    }

    public void setOrder(List<Order> order) {
        this.order = order;
    }
}
