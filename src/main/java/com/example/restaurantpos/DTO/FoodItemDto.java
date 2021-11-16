package com.example.restaurantpos.DTO;

import com.example.restaurantpos.model.FoodItem;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItemDto implements Cloneable{

  public static FoodItemDto mapper(FoodItem foodItem) {
    return FoodItemDto.builder()
        .id(foodItem.getId())
        .name(foodItem.getName())
        .price(foodItem.getPrice())
        .status(foodItem.getStatus().toString())
        .type(foodItem.getType().getName())
        .image(foodItem.getImage())
        .recommended(foodItem.getRecommended())
        .build();
  }

  private UUID id;
  private String name;
  private Integer price;
  private String status;
  private String type;
  private String image;
  private Boolean recommended;

  public FoodItemDto clone() throws CloneNotSupportedException {
    return (FoodItemDto) super.clone();
  }
}
