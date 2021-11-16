package com.example.restaurantpos.model;

import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
public class OrderItem {

  @Id
  @GeneratedValue
  private UUID id;
  private UUID foodId;
  private Integer quantity;

}
