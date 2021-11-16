package com.example.restaurantpos.secutiry;

import com.google.common.hash.Hashing;
import java.nio.charset.StandardCharsets;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * @author phunq3107
 * @since 11/16/2021
 */
@Component
public class MyPasswordEncoder implements PasswordEncoder {

  private String sha256(String rawPassword) {
    return Hashing.sha256().hashString(rawPassword, StandardCharsets.UTF_8).toString();
  }

  @Override
  public String encode(CharSequence charSequence) {
    return sha256((String) charSequence);
  }

  @Override
  public boolean matches(CharSequence charSequence, String encodedPassword) {
    return encode(charSequence).equals(encodedPassword);
  }
}