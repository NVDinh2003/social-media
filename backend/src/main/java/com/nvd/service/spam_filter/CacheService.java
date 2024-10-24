package com.nvd.service.spam_filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvd.utils.CacheConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

@Service
@RequiredArgsConstructor
public class CacheService {

    //    @Autowired
    private Jedis jedisConnectionFactory;

    private final ObjectMapper objectMapper;

    public String getByKey(String key) {
        return jedisConnectionFactory.get(key);
    }

    public String writeCacheAtTime(String key, Object result, long time, int timeUnit) {
        if (timeUnit == CacheConstants.TimeUnit_SECONDS) {
            // đơn vị giây
        } else if (timeUnit == CacheConstants.TimeUnit_MINUTE) {
            // đơn vị phút
            time = time * CacheConstants.TimeUnit_MINUTE;
        } else if (timeUnit == CacheConstants.TimeUnit_HOUR) {
            // đơn vị giờ
            time = time * CacheConstants.TimeUnit_HOUR;
        }
        try {
            String json = objectMapper.writeValueAsString(result);
            System.out.println("Writing " + json);
            jedisConnectionFactory.set(key, json);
            jedisConnectionFactory.expire(key, time);

            System.out.println("Write success! key: " + key);
        } catch (Exception e) {
            return CacheConstants.ERROR;
        }
        return CacheConstants.DONE;
    }

}