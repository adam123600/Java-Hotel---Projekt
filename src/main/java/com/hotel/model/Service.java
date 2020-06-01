package com.hotel.model;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity(name = "Service")
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id", nullable = false)
    private ServiceType serviceType;

    @Size(max = 1000)
    @Column( name = "description" )
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    public Service() { }

    public Service(ServiceType serviceType)
    {
        this.serviceType = serviceType;
    }

    public Service(Long id, @Size(max = 1000) String description,
                   ServiceType serviceType, Room room) {
        this.id = id;
        this.description = description;
        this.serviceType = serviceType;
        this.room = room;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public String getDescription() { return description; }

    public void setDescription(String description) {
        this.description = description; }

    public Room getRoom() { return room; }

    public void setRoom(Room room) { this.room = room; }
}
