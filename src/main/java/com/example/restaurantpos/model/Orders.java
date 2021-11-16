package com.example.restaurantpos.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
@Entity
public class Orders {

  @Id
  @GeneratedValue
  private UUID id;
  private String customerName;
  private String customerPhone;
  private String tableNumber;
  private String status;
  @OneToMany(cascade = CascadeType.ALL)
  private List<OrderItem> items = new ArrayList<>();
}
