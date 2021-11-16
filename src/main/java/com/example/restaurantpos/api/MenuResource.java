package com.example.restaurantpos.api;

import com.example.restaurantpos.DTO.FoodItemDto;
import com.example.restaurantpos.model.FoodType;
import com.example.restaurantpos.model.OrderItem;
import com.example.restaurantpos.model.OrderStatus;
import com.example.restaurantpos.model.Orders;
import com.example.restaurantpos.service.MenuService;
import com.example.restaurantpos.service.OrderService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@RestController
@RequestMapping("/api/v1/menu")
@AllArgsConstructor
public class MenuResource {

  private final MenuService menuService;
  private final OrderService orderService;

  @GetMapping("/items")
  @ResponseBody
  @ResponseStatus(HttpStatus.OK)
  public List<FoodItemDto> getMenuItem() {
    return menuService.getAllFoodItem();
  }

  @GetMapping("/types")
  @ResponseBody
  @ResponseStatus(HttpStatus.OK)
  public List<FoodType> getMenuType() {
    return menuService.getAllFoodType();
  }

  @PostMapping("/orders")
  @ResponseStatus(HttpStatus.OK)
  public void createOrder(@RequestBody Orders orders) {
    orders.setStatus(OrderStatus.pending.getName());
    orders.setId(null);
    for (OrderItem item : orders.getItems()) {
      item.setId(null);
    }
    orderService.createOrder(orders);
  }
}
