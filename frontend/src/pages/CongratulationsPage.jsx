import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function CongratulationsPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Emirates Food Industries — Congratulations";
    fetch(`${API}/api/employees/${token}`)
      .then(res => { if (!res.ok) throw new Error("Not found"); return res.json(); })
      .then(data => setEmployee(data))
      .catch(() => setError("Could not load your details."));
  }, [token]);

  if (error) return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={{ color: "#c0392b", fontWeight: "bold" }}>{error}</p>
      </div>
    </div>
  );

  if (!employee) return (
    <div style={styles.page}>
      <div style={styles.container}><p>Loading...</p></div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <img src="/images/emiratesfood.webp" alt="EFI Logo" style={styles.logo} />
          <div>
            <h1 style={styles.companyName}>Emirates Food Industries</h1>
            <p style={styles.tagline}>Employee Acceptance Portal</p>
          </div>
        </div>

        <div style={styles.emoji}>🎉</div>
        <h2 style={styles.title}>Congratulations, {employee.full_name}!</h2>
        <h3 style={styles.subTitle}>You have been accepted to Emirates Food Industries!</h3>

        {employee.photo_url && (
          <img src={employee.photo_url} alt={employee.full_name} style={styles.photo} />
        )}

        <div style={styles.detailBox}>
          <div style={styles.detailRow}>
            <span style={styles.label}>Full Name</span>
            <span style={styles.value}>{employee.full_name}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Passport ID</span>
            <span style={styles.value}>{employee.passport_id}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Work ID</span>
            <span style={styles.value}>{employee.work_id}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Member Since</span>
            <span style={styles.value}>
              {new Date(employee.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          style={styles.button}
          onMouseOver={e => e.target.style.backgroundColor = "#1F618D"}
          onMouseOut={e => e.target.style.backgroundColor = "#2980b9"}
          onClick={() => navigate(`/work-id/${token}`)}
        >
          View My Digital Work ID →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#FFF8E7",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "30px 20px",
  },
  container: {
    width: "95%",
    maxWidth: "650px",
    backgroundColor: "#fff8e7",
    padding: "36px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "28px",
    paddingBottom: "20px",
    borderBottom: "2px solid #0B3C5D",
    textAlign: "left",
  },
  logo: {
    width: "55px",
    height: "55px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "4px",
    border: "1px solid #ddd",
  },
  companyName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#0B3C5D",
  },
  tagline: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
  },
  emoji: { fontSize: "64px", marginBottom: "16px" },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: "8px",
  },
  subTitle: {
    fontSize: "17px",
    color: "#0B3C5D",
    fontWeight: "600",
    marginBottom: "24px",
  },
  photo: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #0B3C5D",
    margin: "0 auto 24px",
    display: "block",
  },
  detailBox: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #ddd",
    overflow: "hidden",
    marginBottom: "28px",
    textAlign: "left",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid #f0f0f0",
  },
  label: {
    fontWeight: "600",
    color: "#555",
    fontSize: "14px",
  },
  value: {
    color: "#2C3E50",
    fontWeight: "500",
    fontSize: "14px",
  },
  button: {
    padding: "13px 36px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2980b9",
    color: "#fff",
    transition: "all 0.3s",
  },
};