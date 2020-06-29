package com.hotel.repository;

import com.hotel.model.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Room.class);        // jak potrzebujesz, żeby w jsonie było id dla innej klasy to se dodaj
        config.exposeIdsFor(Guest.class);
        config.exposeIdsFor(Service.class);
        config.exposeIdsFor(Order.class);
        config.exposeIdsFor(NotificationType.class);
    }
}