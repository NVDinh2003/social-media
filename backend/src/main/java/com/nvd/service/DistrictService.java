package com.nvd.service;

import com.nvd.models.District;
import com.nvd.repositories.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DistrictService {
    @Autowired
    private DistrictRepository districtRepository;

    //tìm quận/huyện theo id
    public District findDistrictByID(String code) {
        return districtRepository.findDistrictByID(code);
    }

    //lấy tất cả tên quận/huyện
    public List<Object[]> getAllDistrictName(String code) {
        return districtRepository.getAllDistrictName(code);
    }

    //lấy tất cả tên quận/huyện
    public List<Object[]> getAllDistrict() {
        return districtRepository.getAllDistrict();
    }

    //tìm mã quận/huyện theo tên
    public String districtCode(String districtName, String provinceCode) {
        return districtRepository.districtCode(districtName, provinceCode);
    }

    public List<District> findByIdProvince(String id) {
        return districtRepository.findByIdProvince(id);
    }

    public List<District> findAll() {
        return districtRepository.findAll();
    }

    public District districts(String districtName, String provinceCode) {
        return districtRepository.districts(districtName, provinceCode);
    }
}
