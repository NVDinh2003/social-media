package com.nvd.utils;

import com.nvd.models.ApplicationUser;

import java.util.Comparator;

public class DiscoveryUserComparator implements Comparator<ApplicationUser> {

    @Override
    public int compare(ApplicationUser o1, ApplicationUser o2) {
        return -Integer.compare(o1.getFollowers().size(), o2.getFollowers().size());
    }
}
