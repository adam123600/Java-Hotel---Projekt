package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * Model gościa w bazie danych w relacji wiele do jednego z pokojem.
 */

@Entity
@Table(name="guests")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 40,nullable = false)
    @Size(max = 40)
    @NotBlank
    private String firstName;

    @Column(length = 40,nullable = false)
    @Size(max = 40)
    @NotBlank
    private String lastName;

    @Column(nullable = false)
    @Type(type="date")
    private Date accommodationDate;

    @Column(nullable = false)
    @Type(type="date")
    private Date checkOutDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    public Guest() {
    }

    public Guest(Long id, @Size(max = 40) @NotBlank String firstName, @Size(max = 40) @NotBlank String lastName, @NotBlank Date accommodationDate, @NotBlank Date checkOutDate, Room room) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accommodationDate = accommodationDate;
        this.checkOutDate = checkOutDate;
        this.room = room;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getAccommodationDate() {
        return accommodationDate;
    }

    public void setAccommodationDate(Date accommodationDate) {
        this.accommodationDate = accommodationDate;
    }

    public Date getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(Date checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
