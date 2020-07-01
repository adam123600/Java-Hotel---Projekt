package com.hotel.model;

import javax.persistence.*;

@Entity(name = "RatePayment")
@Table(name = "ratePayment")
public class ratePayment {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable =  false)
    private User user;

    @Column(nullable = false)
    private Float ratePerHour;

    public ratePayment() {}

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

    public Float getRatePerHour() {
        return ratePerHour;
    }

    public void setRatePerHour(Float ratePerHour) {
        this.ratePerHour = ratePerHour;
    }
}
