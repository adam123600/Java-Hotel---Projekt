package com.hotel.repository;

import com.hotel.model.Guest;
import com.hotel.model.Room;
import com.hotel.model.Service;
import com.hotel.model.User;
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
    }
}