package com.nvd.repositories;

import com.nvd.models.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//@Cacheable("provinces")//Tạo bộ nhớ đệm
public interface ProvinceRepository extends JpaRepository<Province, String> {

    //tìm thành phố/tỉnh theo id
    @Query(value = "SELECT * FROM provinces WHERE code=:code", nativeQuery = true)
    Province findProvinceByID(String code);

    //lấy tất cả tên thành phố
    @Query(value = "SELECT full_name FROM provinces", nativeQuery = true)
    List<Object[]> getAllProvinceName();

    //tìm mã tỉnh theo tên
    @Query(value = "SELECT code FROM provinces WHERE full_name=:provinceName", nativeQuery = true)
    String provinceCode(String provinceName);

    @Query(value = "SELECT * FROM provinces WHERE full_name=:provinceName", nativeQuery = true)
    Province provinces(String provinceName);


}