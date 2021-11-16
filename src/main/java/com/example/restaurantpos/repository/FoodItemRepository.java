package com.example.restaurantpos.repository;

import com.example.restaurantpos.model.FoodItem;
import java.util.List;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Repository
public interface FoodItemRepository extends CrudRepository<FoodItem, UUID> {

  List<FoodItem> findAll();
}
