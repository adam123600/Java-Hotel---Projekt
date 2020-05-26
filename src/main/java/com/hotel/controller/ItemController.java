package com.hotel.controller;

import com.hotel.model.Item;
import com.hotel.repository.ItemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    @GetMapping
    @RequestMapping("{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemRepository.getOne(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Item addNewItem(@RequestBody final Item item){
        return itemRepository.saveAndFlush(item);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItemById(@PathVariable Long id){
        itemRepository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Item updateItem(@PathVariable Long id, @Valid @RequestBody Item item){
        Item existingItem = itemRepository.getOne(id);
        BeanUtils.copyProperties(item, existingItem,"item_id");
        return itemRepository.saveAndFlush(existingItem);
    }
}
