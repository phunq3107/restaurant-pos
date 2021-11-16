package com.example.restaurantpos.model;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
public enum OrderStatus {
  pending("pending"),
  preparing("preparing"),
  finish("finish"),
  cancel("cancel");

  private final String name;

  OrderStatus(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
