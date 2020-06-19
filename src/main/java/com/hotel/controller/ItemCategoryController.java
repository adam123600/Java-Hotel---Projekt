package com.hotel.controller;

import com.hotel.model.ItemCategory;
import com.hotel.repository.ItemCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/items1/categories")
public class ItemCategoryController {
    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @GetMapping
    public List<ItemCategory> getAllCategories() {
        return itemCategoryRepository.findAll();
    }
}
