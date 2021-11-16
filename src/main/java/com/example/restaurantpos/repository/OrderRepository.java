package com.example.restaurantpos.repository;

import com.example.restaurantpos.model.Orders;
import java.util.List;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Repository
public interface OrderRepository extends CrudRepository<Orders, UUID> {

  List<Orders> getAllByStatusOrStatus(String status1, String status2);
}
