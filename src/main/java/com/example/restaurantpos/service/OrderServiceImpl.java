package com.example.restaurantpos.service;

import com.example.restaurantpos.model.OrderStatus;
import com.example.restaurantpos.model.Orders;
import com.example.restaurantpos.repository.OrderRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {


  private final OrderRepository orderRepository;

  @Override
  public Orders createOrder(Orders order) {
    return orderRepository.save(order);
  }

  @Override
  public List<Orders> getAllOrderWithStatusIsPendingOrPreparing() {
    return orderRepository
        .getAllByStatusOrStatus(
            OrderStatus.pending.getName(),
            OrderStatus.preparing.getName()
        );
  }
}
