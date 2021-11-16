package com.example.restaurantpos.service;

import com.example.restaurantpos.model.Orders;
import java.util.List;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
public interface OrderService {
  Orders createOrder(Orders orders);
  List<Orders> getAllOrderWithStatusIsPendingOrPreparing();
}
