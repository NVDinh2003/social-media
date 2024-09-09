package com.nvd.utils;

import com.nvd.models.ApplicationUser;

import java.util.Comparator;

public class DiscoveryUserComparator implements Comparator<ApplicationUser> {
    // class này dùng để so sánh 2 user dựa trên số lượng followers của họ

    @Override
    public int compare(ApplicationUser o1, ApplicationUser o2) {
        // > 0 nếu o1 > o2
        // < 0 nếu o1 < o2
        // = 0 nếu o1 = o2
        // sử dụng -Integer.compare() để đảo ngược kết quả nếu muốn so sánh theo thứ tự giảm dần
        return -Integer.compare(o1.getFollowers().size(), o2.getFollowers().size());
    }
}
