package com.nvd.service;


import com.nvd.models.Province;
import com.nvd.repositories.ProvinceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProvinceService {
    @Autowired
    private ProvinceRepository provinceRepository;

    //tìm thành phố/tỉnh theo id
    public Province findProvinceByID(String code) {
        return provinceRepository.findProvinceByID(code);
    }

    //lấy tất cả tên thành phố
    public List<Object[]> getAllProvinceName() {
        return provinceRepository.getAllProvinceName();
    }

    //-tìm mã tỉnh theo tên
    public String provinceCode(String provinceName) {
        return provinceRepository.provinceCode(provinceName);
    }

    public List<Province> findAll() {
        return provinceRepository.findAll();
    }

    public Province provinces(String name) {
        return provinceRepository.provinces(name);
    }
}
