import { useState } from "react";

const Results = () => {
  // Giả lập danh sách kết quả đo
  const [results, setResults] = useState([
    { id: 1, name: "Điểm đo 1", lat: 21.0285, lng: 105.8542, pollution: 50 },
    { id: 2, name: "Điểm đo 2", lat: 21.035, lng: 105.85, pollution: 70 }
  ]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h2>Kết quả đo mức độ ô nhiễm ánh sáng</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          border: "1px solid #ddd"
        }}
      >
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Tên điểm đo</th>
            <th style={styles.th}>Vĩ độ</th>
            <th style={styles.th}>Kinh độ</th>
            <th style={styles.th}>Mức độ ô nhiễm</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res) => (
            <tr key={res.id} style={styles.tr}>
              <td style={styles.td}>{res.id}</td>
              <td style={styles.td}>{res.name}</td>
              <td style={styles.td}>{res.lat}</td>
              <td style={styles.td}>{res.lng}</td>
              <td style={styles.td}>{res.pollution} lux</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Style bảng
const styles = {
  th: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center"
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center"
  },
  tr: {
    background: "#f9f9f9"
  }
};

export default Results;
