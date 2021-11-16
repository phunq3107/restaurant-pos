package com.example.restaurantpos.api;

import com.example.restaurantpos.model.Orders;
import com.example.restaurantpos.service.OrderService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@RestController
@RequestMapping("/api/v1/clerk")
@AllArgsConstructor
public class ClerkResource {

  private final OrderService orderService;

  @GetMapping("/orders")
  List<Orders> getOrders() {
    return orderService.getAllOrderWithStatusIsPendingOrPreparing();
  }

}
