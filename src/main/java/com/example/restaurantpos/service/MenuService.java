package com.example.restaurantpos.service;

import com.example.restaurantpos.DTO.FoodItemDto;
import com.example.restaurantpos.model.FoodType;
import java.util.List;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
public interface MenuService {
  List<FoodType> getAllFoodType();
  List<FoodItemDto> getAllFoodItem();
}
