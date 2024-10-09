package com.nvd.repositories;

import com.nvd.models.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//@Cacheable("wards")//Tạo bộ nhớ đệm
public interface WardRepository extends JpaRepository<Ward, String> {

    // tìm xã/phường theo id
    @Query(value = "SELECT * FROM wards WHERE code=:code", nativeQuery = true)
    Ward findWardByID(String code);

    // lấy tất cả tên xã/phường
    @Query(value = "SELECT full_name FROM wards WHERE district_code=:code", nativeQuery = true)
    List<Object[]> getAllWardName(String code);

    // lấy tất cả tên xã/phường
    @Query(value = "SELECT full_name FROM wards", nativeQuery = true)
    List<Object[]> getAllWard();

    //tìm mã xã/phường theo tên
    @Query(value = "SELECT code FROM wards WHERE full_name =:wardName AND district_code=:districtCode", nativeQuery = true)
    String wardCode(String wardName, String districtCode);

    @Query(value = "SELECT * FROM wards WHERE district_code=:id", nativeQuery = true)
    List<Ward> findByIdDistrict(String id);

    @Query(value = "SELECT * FROM wards WHERE full_name =:wardName AND district_code=:districtCode", nativeQuery = true)
    Ward ward(String wardName, String districtCode);
}
