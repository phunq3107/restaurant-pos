package com.example.restaurantpos.service;

import com.example.restaurantpos.model.FoodItem;
import com.example.restaurantpos.model.FoodType;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
public interface ManagerService {
    FoodType addFoodType(FoodType foodType);
    FoodItem addFoodItem(FoodItem foodItem);
}
