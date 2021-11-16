package com.example.restaurantpos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Controller
@RequestMapping("/clerk")
public class ClerkController {
  @GetMapping("/orders")
  public String getOrderManagementPage(){
    return "clerk/orders";
  }
}
