import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ searchQuery }) => {
  const [sensorData, setSensorData] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch sensor data from backend
    fetch("http://localhost:5000/api/sensor")
      .then((response) => response.json())
      .then((data) => setSensorData(data))
      .catch((error) => console.error("❌ Error fetching sensor data:", error));
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
          center={[sensor.lat, sensor.lng]}
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