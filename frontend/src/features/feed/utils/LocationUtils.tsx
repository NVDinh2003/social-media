import provincesData from "../../../data/Vietnamese-provinces.json"; // Đường dẫn đến file JSON

// Khai báo các kiểu dữ liệu cho tỉnh, quận, phường
interface Ward {
  code: string;
  name: string;
  full_name: string;
  district_code: string;
}

interface District {
  code: string;
  name: string;
  full_name: string;
  province_code: string;
}

interface Province {
  code: string;
  name: string;
  full_name: string;
}

// Lấy dữ liệu từ file JSON
const provinces: Province[] = provincesData.provinces;
const districts: District[] = provincesData.districts;
const wards: Ward[] = provincesData.wards;

// Hàm tạo dropdown cho các mục
const createOptions = (
  items: { key: string; value: string }[]
): JSX.Element[] => {
  return items.map((item) => (
    <option key={item.key} value={item.key}>
      {item.value}
    </option>
  ));
};

// Hàm lấy danh sách tỉnh
export const getProvinces = (): JSX.Element[] => {
  return createOptions(
    provinces.map((province) => ({ key: province.code, value: province.name }))
  );
};

// Hàm lấy danh sách quận theo mã tỉnh
export const getDistricts = (provinceCode: string): JSX.Element[] => {
  const filteredDistricts = districts.filter(
    (district) => district.province_code === provinceCode
  );
  // console.log("filteredDistricts: ", filteredDistricts);
  return createOptions(
    filteredDistricts.map((district) => ({
      key: district.code,
      value: district.name,
    }))
  );
};

// Hàm lấy danh sách phường theo mã quận
export const getWards = (districtCode: string): JSX.Element[] => {
  const filteredWards = wards.filter(
    (ward) => ward.district_code === districtCode
  );
  // console.log("filteredWards: ", filteredWards);
  return createOptions(
    filteredWards.map((ward) => ({ key: ward.code, value: ward.name }))
  );
};

// lấy tên tỉnh/TP bằng mã tỉnh
export const getProvinceFullName = (provinceCode: string): string => {
  const province = provinces.find((province) => province.code === provinceCode);
  return province ? province.full_name : "";
};

// lấy tên quận/huyện bằng mã quận
export const getDistrictFullName = (districtCode: string): string => {
  const district = districts.find((district) => district.code === districtCode);
  return district ? district.full_name : "";
};

// lấy tên phường/xã bằng mã phường
export const getWardFullName = (wardCode: string): string => {
  const ward = wards.find((ward) => ward.code === wardCode);
  return ward ? ward.full_name : "";
};

export const getLocationInfo = (
  provinceCode: string,
  districtCode: string,
  wardCode: string
): string => {
  return `${getWardFullName(wardCode)}, ${getDistrictFullName(
    districtCode
  )}, ${getProvinceFullName(provinceCode)}`;
};
