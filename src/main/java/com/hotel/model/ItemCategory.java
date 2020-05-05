package com.hotel.model;

import javax.persistence.*;

@Entity
@Table(name = "category_of_item")
public class ItemCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EItem category;

    public ItemCategory() {
    }

    public ItemCategory(EItem itemCategory){
        this.category = itemCategory;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EItem getCategory() {
        return category;
    }

    public void setCategory(EItem category) {
        this.category = category;
    }
}
