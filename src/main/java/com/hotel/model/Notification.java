package com.hotel.model;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


/**
 * Model powiadomienia w bazie danych
 */

@Entity(name="Notification")
@Table(name="notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    @Column(name = "user_id")
    private String username;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id", nullable = false)
    private NotificationType notType;


    public Notification() {
    }

    public Notification(String username, NotificationType notType){
        this.username = username;
        this.notType = notType;

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public NotificationType getNotType() {
        return notType;
    }

    public void setNotType(NotificationType notType) {
        this.notType = notType;
    }

    public Long getNotType_id(){
        return notType.getId();
    }


}
