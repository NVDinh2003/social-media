package com.nvd.repositories;


import com.nvd.models.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//@Cacheable("districts")//Tạo bộ nhớ đệm
public interface DistrictRepository extends JpaRepository<District, String> {

    //tìm quận/huyện theo id
    @Query(value = "SELECT * FROM districts WHERE code=:code", nativeQuery = true)
    District findDistrictByID(String code);

    //tìm quận/huyện theo mã và mã tỉnh
    @Query(value = "SELECT * FROM districts WHERE code=:code AND province_code=:provinceCode", nativeQuery = true)
    District findByCodeAndProvinceCode(String code, String provinceCode);

    //lấy tất cả tên quận/huyện
    @Query(value = "SELECT full_name FROM districts WHERE province_code=:code", nativeQuery = true)
    List<Object[]> getAllDistrictName(String code);

    //lấy tất cả tên quận/huyện
    @Query(value = "SELECT full_name FROM districts", nativeQuery = true)
    List<Object[]> getAllDistrict();

    //tìm mã quận/huyện theo tên
    @Query(value = "SELECT code FROM districts WHERE full_name=:districtName AND province_code=:provinceCode", nativeQuery = true)
    String districtCode(String districtName, String provinceCode);

    @Query(value = "SELECT * FROM districts WHERE province_code=:id", nativeQuery = true)
    List<District> findByIdProvince(String id);


    @Query(value = "SELECT code FROM districts WHERE full_name=:districtName AND province_code=:provinceCode", nativeQuery = true)
    District districts(String districtName, String provinceCode);

}
