import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function StatusPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [passportId, setPassportId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Emirates Food Industries — Check Status";
  }, []);

  const handleCheckStatus = async () => {
    if (!passportId.trim()) return setError("Please enter your Passport ID.");
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/employees/${token}`);
      if (!res.ok) throw new Error("Not found");
      const employee = await res.json();

      if (employee.passport_id !== passportId.trim()) {
        setError("Passport ID does not match. Please try again.");
        setLoading(false);
        return;
      }

      navigate(`/congratulations/${token}`);
    } catch (err) {
      setError("Could not verify your details. Please check your link and Passport ID.");
    }
    setLoading(false);
  };

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

        <div style={styles.iconWrap}>🔍</div>
        <h2 style={styles.title}>Check Your Status</h2>
        <p style={styles.text}>
          Please enter your Passport ID below to verify your identity and
          view your acceptance status.
        </p>

        <div style={styles.formBox}>
          <label style={styles.label}>Passport ID</label>
          <input
            type="text"
            placeholder="Enter your Passport ID"
            value={passportId}
            onChange={e => setPassportId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCheckStatus()}
            onFocus={e => {
              e.target.style.borderColor = "#1F618D";
              e.target.style.boxShadow = "0 0 8px rgba(31,97,141,0.4)";
            }}
            onBlur={e => {
              e.target.style.borderColor = "#2C3E50";
              e.target.style.boxShadow = "none";
            }}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button
            onClick={handleCheckStatus}
            disabled={loading}
            style={styles.button}
            onMouseOver={e => e.target.style.backgroundColor = "#1F618D"}
            onMouseOut={e => e.target.style.backgroundColor = "#2980b9"}
          >
            {loading ? "Checking..." : "Check Status →"}
          </button>
        </div>
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
    alignItems: "center",
    padding: "30px 20px",
  },
  container: {
    width: "95%",
    maxWidth: "520px",
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
  iconWrap: {
    fontSize: "52px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: "12px",
  },
  text: {
    fontSize: "15px",
    color: "#34495e",
    lineHeight: "1.7",
    marginBottom: "24px",
  },
  formBox: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "24px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontWeight: "600",
    fontSize: "14px",
    color: "#2C3E50",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #2C3E50",
    outline: "none",
    marginBottom: "16px",
    transition: "0.3s border, 0.3s box-shadow",
    boxSizing: "border-box",
  },
  error: {
    color: "#c0392b",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "12px",
    marginTop: "-8px",
  },
  button: {
    width: "100%",
    padding: "13px",
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