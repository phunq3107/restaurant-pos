package com.example.restaurantpos.service;

import com.example.restaurantpos.model.FoodItem;
import com.example.restaurantpos.model.FoodType;
import com.example.restaurantpos.repository.FoodItemRepository;
import com.example.restaurantpos.repository.FoodTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Service
@AllArgsConstructor
public class ManagerServiceImpl implements ManagerService {

  private final FoodTypeRepository foodTypeRepository;
  private final FoodItemRepository foodItemRepository;

  @Override
  public FoodType addFoodType(FoodType foodType) {
    return foodTypeRepository.save(foodType);
  }

  @Override
  public FoodItem addFoodItem(FoodItem foodItem) {
    return foodItemRepository.save(foodItem);
  }
}
