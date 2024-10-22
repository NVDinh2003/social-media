package com.nvd.dto.oauth;

import lombok.Data;

@Data
public class ExchangeTokenResponse {
    private String accessToken;
    private String tokenType;
    private String expiresIn;
    private String refreshToken;
    private String scope;
    private String idToken;
}