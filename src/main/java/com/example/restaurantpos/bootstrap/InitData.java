package com.example.restaurantpos.bootstrap;

import com.example.restaurantpos.model.FoodItem;
import com.example.restaurantpos.model.FoodType;
import com.example.restaurantpos.model.OrderItem;
import com.example.restaurantpos.model.OrderStatus;
import com.example.restaurantpos.model.Orders;
import com.example.restaurantpos.service.ManagerService;
import com.example.restaurantpos.service.OrderServiceImpl;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author phunq3107
 * @since 11/15/2021
 */
@Profile("dev")
@Component
@AllArgsConstructor
@Transactional
public class InitData implements CommandLineRunner {


  private final ManagerService managerService;
  private final OrderServiceImpl orderService;

  public int getRandomNumber() {
    int min = 1;
    int max = 10;
    int val = (int) ((Math.random() * (max - min)) + min);
    return val > 1 ? 1 : 0;
  }

  @Override
  public void run(String... args) throws Exception {
    FoodType hot = managerService.addFoodType(FoodType.builder()
        .name("Hot")
        .image("no-image.png")
        .build()
    );
    FoodType fastFood = managerService.addFoodType(FoodType.builder()
        .name("Đồ ăn nhanh")
        .image("hamburger-1.jpg")
        .build()
    );
    FoodType juice = managerService.addFoodType(FoodType.builder()
        .name("Nước ép")
        .image("orange-juice.png")
        .build()
    );
    FoodType softDrink = managerService.addFoodType(FoodType.builder()
        .name("Nước ngọt")
        .image("pepsi.jpg")
        .build()
    );
    FoodType cake = managerService.addFoodType(FoodType.builder()
        .name("Bánh ngọt")
        .image("cake.jpg")
        .build()
    );

    for (int i = 0; i < 10; i++) {
      managerService.addFoodItem(FoodItem.builder()
          .name("Hamburger")
          .price(30000)
          .image("hamburger-1.jpg")
          .type(fastFood)
          .status(getRandomNumber())
          .recommended(false)
          .build()
      );
    }
    for (int i = 0; i < 9; i++) {
      managerService.addFoodItem(FoodItem.builder()
          .name("Cam ép")
          .price(15000)
          .image("orange-juice.png")
          .type(juice)
          .status(getRandomNumber())
          .recommended(false)
          .build()
      );
    }
    for (int i = 0; i < 7; i++) {
      managerService.addFoodItem(FoodItem.builder()
          .name("Pepsi")
          .price(10000)
          .image("pepsi.jpg")
          .type(softDrink)
          .status(getRandomNumber())
          .recommended(false)
          .build()
      );
    }
    for (int i = 0; i < 8; i++) {
      managerService.addFoodItem(FoodItem.builder()
          .name("Bánh kem")
          .price(70000)
          .image("cake.jpg")
          .type(cake)
          .status(getRandomNumber())
          .recommended(false)
          .build()
      );
    }

    FoodItem hamburger = managerService.addFoodItem(FoodItem.builder()
        .name("Hamburger")
        .price(30000)
        .image("hamburger-1.jpg")
        .type(fastFood)
        .status(getRandomNumber())
        .recommended(true)
        .build()
    );

    FoodItem orange = managerService.addFoodItem(FoodItem.builder()
        .name("Cam ép")
        .price(15000)
        .image("orange-juice.png")
        .type(juice)
        .status(getRandomNumber())
        .recommended(true)
        .build()
    );

    FoodItem pepsi = managerService.addFoodItem(FoodItem.builder()
        .name("Pepsi")
        .price(10000)
        .image("pepsi.jpg")
        .type(softDrink)
        .status(getRandomNumber())
        .recommended(true)
        .build()
    );

    FoodItem creamCake = managerService.addFoodItem(FoodItem.builder()
        .name("Bánh kem")
        .price(70000)
        .image("cake.jpg")
        .type(cake)
        .status(getRandomNumber())
        .recommended(true)
        .build()
    );

    orderService.createOrder(Orders.builder()
        .customerName("Khách hàng 1")
        .customerPhone("0123456789")
        .tableNumber("12")
        .status(OrderStatus.pending.getName())
        .items(List.of(
            OrderItem.builder()
                .foodId(hamburger.getId())
                .quantity(2)
                .build(),
            OrderItem.builder()
                .foodId(pepsi.getId())
                .quantity(2)
                .build()
        ))
        .build()
    );

    orderService.createOrder(Orders.builder()
        .customerName("Khách hàng 2")
        .customerPhone("0123456789")
        .tableNumber("22")
        .status(OrderStatus.preparing.getName())
        .items(List.of(
            OrderItem.builder()
                .foodId(creamCake.getId())
                .quantity(1)
                .build()
        ))
        .build()
    );


  }
}
