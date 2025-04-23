import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ searchQuery }) => {
  const [sensorData, setSensorData] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const vietnamProvinces = [
      { id: 1, name: "Hà Nội", lat: 21.0285, lng: 105.8542 },
      { id: 2, name: "Hồ Chí Minh", lat: 10.8231, lng: 106.6297 },
      { id: 3, name: "Đà Nẵng", lat: 16.0471, lng: 108.2068 },
      { id: 4, name: "Hải Phòng", lat: 20.8449, lng: 106.6881 },
      { id: 5, name: "Cần Thơ", lat: 10.0452, lng: 105.7469 },
      { id: 6, name: "Huế", lat: 16.4637, lng: 107.5909 },
      { id: 7, name: "Nha Trang", lat: 12.2388, lng: 109.1967 },
      { id: 8, name: "Vũng Tàu", lat: 10.4114, lng: 107.1362 },
      { id: 9, name: "Quảng Ninh", lat: 21.0064, lng: 107.2925 },
      { id: 10, name: "Lâm Đồng", lat: 11.5753, lng: 108.1429 },
      { id: 11, name: "Thanh Hóa", lat: 19.8067, lng: 105.7768 },
      { id: 12, name: "Nghệ An", lat: 19.2342, lng: 104.9200 },
      { id: 13, name: "Bình Dương", lat: 11.1732, lng: 106.6625 },
      { id: 14, name: "Bình Thuận", lat: 10.9804, lng: 108.2615 },
      { id: 15, name: "Quảng Nam", lat: 15.5730, lng: 108.4740 },
      { id: 16, name: "Quảng Ngãi", lat: 15.1205, lng: 108.7923 },
      { id: 17, name: "Hà Tĩnh", lat: 18.3551, lng: 105.8877 },
      { id: 18, name: "Thái Nguyên", lat: 21.5942, lng: 105.8440 },
      { id: 19, name: "Bắc Giang", lat: 21.2730, lng: 106.1947 },
      { id: 20, name: "Phú Thọ", lat: 21.3227, lng: 105.2131 },
      { id: 21, name: "Quảng Trị", lat: 16.7500, lng: 107.2000 },
      { id: 22, name: "Quảng Bình", lat: 17.4833, lng: 106.6000 },
      { id: 23, name: "Bắc Ninh", lat: 21.1861, lng: 106.0763 },
      { id: 24, name: "Hòa Bình", lat: 20.8136, lng: 105.3376 },
      { id: 25, name: "Lào Cai", lat: 22.3381, lng: 104.1487 },
      { id: 26, name: "Yên Bái", lat: 21.7229, lng: 104.9113 },
      { id: 27, name: "Điện Biên", lat: 21.3860, lng: 103.0167 },
      { id: 28, name: "Lai Châu", lat: 22.3964, lng: 103.4587 },
      { id: 29, name: "Sơn La", lat: 21.3280, lng: 103.9188 },
      { id: 30, name: "Hà Giang", lat: 22.8233, lng: 104.9836 },
      { id: 31, name: "Cao Bằng", lat: 22.6657, lng: 106.2570 },
      { id: 32, name: "Tuyên Quang", lat: 21.8238, lng: 105.2131 },
      { id: 33, name: "Thái Bình", lat: 20.4500, lng: 106.3333 },
      { id: 34, name: "Nam Định", lat: 20.4333, lng: 106.1667 },
      { id: 35, name: "Ninh Bình", lat: 20.2500, lng: 105.9750 },
      { id: 36, name: "Hà Nam", lat: 20.5833, lng: 105.9167 },
      { id: 37, name: "Vĩnh Phúc", lat: 21.3089, lng: 105.6049 },
      { id: 38, name: "Bắc Kạn", lat: 22.1456, lng: 105.8348 },
      { id: 39, name: "Lạng Sơn", lat: 21.8526, lng: 106.7615 },
      { id: 40, name: "Hưng Yên", lat: 20.6464, lng: 106.0511 },
      { id: 41, name: "Thừa Thiên Huế", lat: 16.4637, lng: 107.5909 },
      { id: 42, name: "Bình Phước", lat: 11.7512, lng: 106.7235 },
      { id: 43, name: "Tây Ninh", lat: 11.3112, lng: 106.0983 },
      { id: 44, name: "Đồng Nai", lat: 10.9453, lng: 106.8240 },
      { id: 45, name: "Long An", lat: 10.6956, lng: 106.2430 },
      { id: 46, name: "Tiền Giang", lat: 10.4493, lng: 106.3421 },
      { id: 47, name: "Bến Tre", lat: 10.2415, lng: 106.3758 },
      { id: 48, name: "Trà Vinh", lat: 9.9347, lng: 106.3455 },
      { id: 49, name: "Vĩnh Long", lat: 10.2537, lng: 105.9722 },
      { id: 50, name: "Đồng Tháp", lat: 10.5359, lng: 105.6327 },
      { id: 51, name: "An Giang", lat: 10.5216, lng: 105.1259 },
      { id: 52, name: "Kiên Giang", lat: 10.0159, lng: 105.0809 },
      { id: 53, name: "Sóc Trăng", lat: 9.6038, lng: 105.9805 },
      { id: 54, name: "Bạc Liêu", lat: 9.2941, lng: 105.7278 },
      { id: 55, name: "Cà Mau", lat: 9.1768, lng: 105.1524 },
      { id: 56, name: "Hậu Giang", lat: 9.7579, lng: 105.6410 },
      { id: 57, name: "Kon Tum", lat: 14.3500, lng: 107.9833 },
      { id: 58, name: "Gia Lai", lat: 13.9833, lng: 108.0000 },
      { id: 59, name: "Đắk Lắk", lat: 12.6667, lng: 108.0500 },
      { id: 60, name: "Đắk Nông", lat: 12.2500, lng: 107.6667 },
      { id: 61, name: "Quảng Bình", lat: 17.4833, lng: 106.6000 },
      { id: 62, name: "Quảng Trị", lat: 16.7500, lng: 107.2000 },
      { id: 63, name: "Phú Yên", lat: 13.0957, lng: 109.3348 },
      { id: 64, name: "PTIT Trần Phú", lat: 20.980879, lng: 105.787222 },
      { id: 65, name: "PTIT Ngọc Trục", lat: 20.984945, lng: 105.768287 },
    ];

    const data = vietnamProvinces.map((province) => ({
      id: province.id,
      name: province.name,
      center: [province.lat, province.lng],
      pollution: Math.random() * 100,
    }));

    setSensorData(data);
  }, []);

  useEffect(() => {
    if (searchQuery && mapRef.current) {
      const foundSensor = sensorData.find((sensor) =>
        sensor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (foundSensor) {
        mapRef.current.setView(foundSensor.center, 10);
      } else {
        alert("Không tìm thấy vị trí phù hợp.");
      }
    }
  }, [searchQuery, sensorData]);

  const getPollutionColor = (pollution) => {
    if (pollution > 75) return "rgba(255, 0, 0, 0.8)";
    if (pollution > 50) return "rgba(255, 165, 0, 0.8)";
    if (pollution > 25) return "rgba(255, 255, 0, 0.8)";
    return "rgba(0, 128, 0, 0.8)";
  };

  return (
    <MapContainer
      center={[16.0471, 108.2068]}
      zoom={6}
      style={{ height: "100vh", width: "100vw" }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {sensorData.map((sensor) => (
        <Circle
          key={sensor.id}
          center={sensor.center}
          pathOptions={{
            color: getPollutionColor(sensor.pollution),
            fillColor: getPollutionColor(sensor.pollution),
            fillOpacity: 0.5,
          }}
          radius={50}
        >
          <Popup>
            <div>
              <strong>{sensor.name}</strong>
              <br />
              Mức độ ô nhiễm: {sensor.pollution.toFixed(2)} lux
              <br />
              Tỉ lệ ô nhiễm: {(sensor.pollution / 100).toFixed(2) * 100}%
            </div>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default MapView;