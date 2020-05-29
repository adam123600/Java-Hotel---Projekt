package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.util.List;

@Entity( name = "ServiceType")
@Table( name = "servicetypes" )
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ServiceType {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "type")
    private String type;

    @Column (nullable = false)
    private Float price;

    @OneToMany(mappedBy = "serviceType", fetch = FetchType.LAZY)
    private List<Service> services;

    public ServiceType() { }

    public ServiceType(String type, Float price) {
        this.type = type;
        this.price = price;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public Float getPrice() { return price; }

    public void setPrice(Float price) { this.price = price; }
}
