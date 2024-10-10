package com.nvd.controller;

import com.nvd.models.District;
import com.nvd.models.Province;
import com.nvd.models.Ward;
import com.nvd.service.DistrictService;
import com.nvd.service.ProvinceService;
import com.nvd.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private WardService wardService;

    @Autowired
    private ProvinceService provinceService;

    @Autowired
    private DistrictService districtService;

    // Endpoint để tìm phường theo ID
    @GetMapping("/ward/{id}")
    public ResponseEntity<Ward> getWardByID(@PathVariable String id) {
        Ward ward = wardService.findWardByID(id);
        return ResponseEntity.ok(ward);
    }

    // Endpoint để lấy tất cả tên phường by province code
    @GetMapping("/ward/names")
    public ResponseEntity<List<Object[]>> getAllWardNames(@RequestParam(required = false) String code) {
        List<Object[]> wards;
        if (code != null) {
            wards = wardService.getAllWardName(code);
        } else {
            wards = wardService.getAllWard();
        }
        return ResponseEntity.ok(wards);
    }

    // Endpoint để tìm mã phường theo tên và mã quận
    @GetMapping("/ward/code")
    public ResponseEntity<String> getWardCode(@RequestParam String wardName, @RequestParam String districtCode) {
        String wardCode = wardService.wardCode(wardName, districtCode);
        return ResponseEntity.ok(wardCode);
    }

    // Endpoint để tìm quận theo ID
    @GetMapping("/district/{id}")
    public ResponseEntity<District> getDistrictByID(@PathVariable String id) {
        District district = districtService.findDistrictByID(id);
        return ResponseEntity.ok(district);
    }

    // Endpoint để lấy tất cả tên quận
    @GetMapping("/district/names")
    public ResponseEntity<List<Object[]>> getAllDistrictNames(@RequestParam(required = false) String code) {
        List<Object[]> districts;
        if (code != null) {
            districts = districtService.getAllDistrictName(code);
        } else {
            districts = districtService.getAllDistrict();
        }
        return ResponseEntity.ok(districts);
    }

    // Endpoint để tìm mã quận theo tên và mã tỉnh
    @GetMapping("/district/code")
    public ResponseEntity<String> getDistrictCode(@RequestParam String districtName, @RequestParam String provinceCode) {
        String districtCode = districtService.districtCode(districtName, provinceCode);
        return ResponseEntity.ok(districtCode);
    }

    // Endpoint để tìm tỉnh theo ID
    @GetMapping("/province/{id}")
    public ResponseEntity<Province> getProvinceByID(@PathVariable String id) {
        Province province = provinceService.findProvinceByID(id);
        return ResponseEntity.ok(province);
    }

    // Endpoint để lấy tất cả tên tỉnh
    @GetMapping("/province/names")
    public ResponseEntity<List<Object[]>> getAllProvinceNames() {
        List<Object[]> provinces = provinceService.getAllProvinceName();
        return ResponseEntity.ok(provinces);
    }

    // Endpoint để tìm mã tỉnh theo tên
    @GetMapping("/province/code")
    public ResponseEntity<String> getProvinceCode(@RequestParam String provinceName) {
        String provinceCode = provinceService.provinceCode(provinceName);
        return ResponseEntity.ok(provinceCode);
    }
}
