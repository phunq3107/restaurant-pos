package com.example.restaurantpos.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Controller
public class IndexController {

  @Profile("dev")
  @GetMapping("/")
  public String getIndexPage() {
    return "index";
  }

}
