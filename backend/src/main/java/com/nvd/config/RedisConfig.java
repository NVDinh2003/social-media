package com.nvd.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import redis.clients.jedis.Jedis;

//@Configuration
public class RedisConfig {

    @Value("${nvd.redis.uri}")
    private String redisURI;

    @Bean
    public Jedis jedisConnectionFactory() {
        Jedis jedis = new Jedis(redisURI);
        System.out.println(jedis.isConnected());
        return jedis;
    }
}