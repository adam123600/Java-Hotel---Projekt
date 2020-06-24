package com.hotel.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity(name = "hoursPayment")
@Table(name = "hours")

public class hoursPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable =  false)
    private User user;

    @Column(nullable = false)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date date;

    @Column(nullable = false)
    private Float amountHours;

    public hoursPayment() {}

    public hoursPayment(Long id, User user, Date date, Float amountHours)
    {
        this.id = id;
        this.user = user;
        this.date = date;
        this.amountHours = amountHours;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Float getAmountHours() {
        return amountHours;
    }

    public void setAmountHours(Float amountHours) {
        this.amountHours = amountHours;
    }
}
