import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/kraftheinz.webp";

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function WorkIDPage() {
  const { token } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Kraft Heinz— Digital ID";
    fetch(`${API}/api/employees/${token}`)
      .then(res => { if (!res.ok) throw new Error("Not found"); return res.json(); })
      .then(data => setEmployee(data))
      .catch(() => setError("Could not load your ID. Please check your link."));
  }, [token]);

  if (error) return (
    <div style={styles.page}>
      <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
    </div>
  );

  if (!employee) return (
    <div style={styles.page}>
      <p>Loading Digital ID...</p>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.idCard}>
        {/* HEADER */}
        <div style={styles.header}>
          <img src={logo} alt="EFI Logo" style={styles.logoStyle} />
          <div style={styles.headerText}>
            <h2 style={{ margin: 0, fontSize: "18px" }}>Emirates Food Industries</h2>
            <p style={{ margin: 0, fontSize: "13px", opacity: 0.85 }}>
              Official Employee Digital ID
            </p>
          </div>
        </div>

        {/* BODY */}
        <div style={styles.body}>
          {/* PHOTO */}
          {employee.photo_url ? (
            <img
              src={employee.photo_url}
              alt={employee.full_name}
              style={styles.photo}
            />
          ) : (
            <div style={styles.photoPlaceholder}>
              <span style={{ fontSize: "48px" }}>👤</span>
            </div>
          )}

          {/* DETAILS */}
          <div style={styles.details}>
            <div style={styles.detailItem}>
              <span style={styles.label}>Full Name</span>
              <span style={styles.value}>{employee.full_name}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.label}>Passport ID</span>
              <span style={styles.value}>{employee.passport_id}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.label}>Work ID</span>
              <span style={styles.value}>{employee.work_id}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.label}>Member Since</span>
              <span style={styles.value}>
                {new Date(employee.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          This card is the property of Emirates Food Industries. If found, please return to the company office.
        </div>
      </div>

      {/* PRINT BUTTON */}
      <button
        style={styles.printBtn}
        onMouseOver={e => e.target.style.backgroundColor = "#1F618D"}
        onMouseOut={e => e.target.style.backgroundColor = "#0B3C5D"}
        onClick={() => window.print()}
      >
        🖨️ Print Digital ID
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "30px 20px",
  },
  idCard: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #dcdcdc",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#0B3C5D",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "18px 24px",
    gap: "16px",
  },
  logoStyle: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "5px",
  },
  headerText: {
    textAlign: "left",
  },
  body: {
    display: "flex",
    padding: "28px",
    gap: "28px",
    flexWrap: "wrap",
  },
  photo: {
    width: "160px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "3px solid #0B3C5D",
    flexShrink: 0,
  },
  photoPlaceholder: {
    width: "160px",
    height: "200px",
    borderRadius: "8px",
    border: "3px solid #0B3C5D",
    backgroundColor: "#f0f4f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    justifyContent: "center",
    minWidth: "200px",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "12px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#0B3C5D",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  value: {
    fontSize: "16px",
    color: "#2c3e50",
    fontWeight: "500",
  },
  footer: {
    borderTop: "1px solid #eee",
    padding: "14px 24px",
    fontSize: "13px",
    color: "#555",
    textAlign: "center",
    backgroundColor: "#fafafa",
  },
  printBtn: {
    marginTop: "24px",
    padding: "13px 36px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#0B3C5D",
    color: "#fff",
    transition: "all 0.3s",
  },
};