package com.nvd.service;


import com.nvd.models.Ward;
import com.nvd.repositories.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class WardService {
    @Autowired
    private WardRepository wardRepository;

    // tìm đường theo id
    public Ward findWardByID(String code) {
        return wardRepository.findWardByID(code);
    }

    // tìm xã/phường theo code và mã quận/huyện
    public Ward findByCodeAndDistrictCode(String code, String districtCode) {
        return wardRepository.findByCodeAndDistrictCode(code, districtCode);
    }

    //lấy tất cả tên xã/phường
    public List<Object[]> getAllWardName(String code) {
        return wardRepository.getAllWardName(code);
    }

    //lấy tất cả tên xã/phường
    public List<Object[]> getAllWard() {
        return wardRepository.getAllWard();
    }

    //tìm mã xã/phường theo tên
    public String wardCode(String wardName, String districtCode) {
        return wardRepository.wardCode(wardName, districtCode);

    }

    public List<Ward> findByIdDistrict(String id) {
        return wardRepository.findByIdDistrict(id);
    }

    public List<Ward> findAllL() {
        return wardRepository.findAll();
    }

    public Ward ward(String wardName, String districtCode) {
        return wardRepository.ward(wardName, districtCode);
    }
}
