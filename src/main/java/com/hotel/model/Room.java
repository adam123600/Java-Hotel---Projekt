package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.experimental.FieldNameConstants;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.lang.annotation.Documented;
import java.util.List;

/**
 * Model pokoju w bazie danych w relacji wiele do jednego ze standardem
 * oraz w relacji jeden do wielu z: gościem i rezerwacją.
 */

@Entity
@Table(name="rooms")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10,nullable = false)
    @Size(max = 10)
    @NotBlank
    private String roomName;

    @Column(nullable = false)
    private Integer currentNumberOfGuests;

    @Column(nullable = false)
    private Float balance;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "standard_id", nullable = false)
    private RoomStandard roomStandard;

    @JsonIgnore
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Reservation> reservations;

    @JsonIgnore
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Guest> guests;

    @JsonIgnore
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Notification> notifications;

    public Room() {
    }

    public Room(Long id, @Size(max = 10) @NotBlank String roomName, Integer currentNumberOfGuests, Float balance, RoomStandard roomStandard, List<Reservation> reservations, List<Guest> guests, List<Notification> notifications) {
        this.id = id;
        this.roomName = roomName;
        this.currentNumberOfGuests = currentNumberOfGuests;
        this.balance = balance;
        this.roomStandard = roomStandard;
        this.reservations = reservations;
        this.guests = guests;
        this.notifications = notifications;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public Integer getCurrentNumberOfGuests() {
        return currentNumberOfGuests;
    }

    public void setCurrentNumberOfGuests(Integer currentNumberOfGuests) {
        this.currentNumberOfGuests = currentNumberOfGuests;
    }

    public Float getBalance() {
        return balance;
    }

    public void setBalance(Float balance) {
        this.balance = balance;
    }

    public RoomStandard getRoomStandard() {
        return roomStandard;
    }

    public void setRoomStandard(RoomStandard roomStandard) {
        this.roomStandard = roomStandard;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public List<Guest> getGuests() {
        return guests;
    }

    public void setGuests(List<Guest> guests) {
        this.guests = guests;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }
}
