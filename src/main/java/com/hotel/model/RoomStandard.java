package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Model standardu pokoju w bazie w relacji jeden do wielu z pokojem.
 * W RAZIE POTRZEBY MOŻNA DOŁOŻYĆ ENUM ZE STANDARDAMI POKOI ZAMIAST ZWYKŁEGO STRINGA Z NAZWĄ
 */

@Entity
@Table(name="standard_of_room")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RoomStandard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 80,nullable = false)
    @Size(max = 80)
    @NotBlank
    private String name;

    @Column(nullable = false)
    private Float price;

    @Column(nullable = false)
    private Integer max_capacity;

    @JsonIgnore
    @OneToMany(mappedBy = "roomStandard", fetch = FetchType.LAZY)
    private List<Room> rooms;

    public RoomStandard() {
    }

    public RoomStandard(Long id, @Size(max = 80) @NotBlank String name, Float price, Integer max_capacity, List<Room> rooms) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.max_capacity = max_capacity;
        this.rooms = rooms;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getMax_capacity() {
        return max_capacity;
    }

    public void setMax_capacity(Integer max_capacity) {
        this.max_capacity = max_capacity;
    }
}
