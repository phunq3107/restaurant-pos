package com.example.restaurantpos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Controller
public class CustomerController {

  @GetMapping("/menu")
  public String getMenuPage() {
    return "customer/menu";
  }

  @GetMapping("/payment")
  public String getPaymentPage() {
    return "customer/payment";
  }
}
