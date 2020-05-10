package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.util.List;


@Entity(name="NotificationType")
@Table(name="notificationtypes")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class NotificationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "type")
    private String type;


    @OneToMany(mappedBy = "notType", fetch = FetchType.LAZY)
    private List<Notification> notifications;



    public NotificationType() {
    }

    public NotificationType(String type){
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}


