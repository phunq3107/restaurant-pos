package com.example.restaurantpos.service;

import com.example.restaurantpos.DTO.FoodItemDto;
import com.example.restaurantpos.model.FoodType;
import com.example.restaurantpos.repository.FoodItemRepository;
import com.example.restaurantpos.repository.FoodTypeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Service
@AllArgsConstructor
@Slf4j
public class MenuServiceImpl implements MenuService {

  private final FoodTypeRepository foodTypeRepository;
  private final FoodItemRepository foodItemRepository;

  @Override
  public List<FoodType> getAllFoodType() {
    return foodTypeRepository.findAll();
  }

  @Override
  public List<FoodItemDto> getAllFoodItem() {
    List<FoodItemDto> getAll = foodItemRepository.findAll().stream()
        .map(FoodItemDto::mapper)
        .collect(Collectors.toList());
    List<FoodItemDto> result = new ArrayList<>();
    for (FoodItemDto item : getAll) {
      result.add(item);
      if (item.getRecommended()) {
        try {
          FoodItemDto newItem = item.clone();
          newItem.setType("Hot");
          result.add(newItem);
        } catch (CloneNotSupportedException e) {
          log.error("Clone fail");
        }
      }
    }

    return result;
  }
}
