package com.nvd.dto.oauth;

import lombok.Builder;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
public class ExchangeTokenRequest {
    private String code;
    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String grantType;

    public Map<String, String> toMap() {
        Map<String, String> map = new HashMap<>();
        map.put("code", code);
        map.put("client_id", clientId);
        map.put("client_secret", clientSecret);
        map.put("redirect_uri", redirectUri);
        map.put("grant_type", grantType);
        return map;
    }
}