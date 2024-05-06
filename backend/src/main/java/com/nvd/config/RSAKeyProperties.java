package com.nvd.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@EnableConfigurationProperties(RSAKeyProperties.class)
@ConfigurationProperties(prefix = "rsa")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
// dùng để mã hóa (sử dụng cặp publicKey và privateKey)
public class RSAKeyProperties {
    private RSAPublicKey publicKey;
    private RSAPrivateKey privateKey;


}
