import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function StatusPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Emirates Food Industries — Status";
  }, []);

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

        {/* STATUS BADGE */}
        <div style={styles.badgeWrap}>
          <span style={styles.badge}>✅ Accepted</span>
        </div>

        <h2 style={styles.title}>Your Application Status</h2>
        <p style={styles.text}>
          Congratulations! Your application has been reviewed and approved by the
          Emirates Food Industries HR team. You are officially a member of our family.
        </p>

        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            🎉 You have been accepted to <strong>Emirates Food Industries</strong>.
            Your digital work ID has been prepared and is ready to view.
          </p>
        </div>

        <button
          style={styles.button}
          onMouseOver={e => e.target.style.backgroundColor = "#1F618D"}
          onMouseOut={e => e.target.style.backgroundColor = "#2980b9"}
          onClick={() => navigate(`/congratulations/${token}`)}
        >
          Continue to Congratulations →
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
    alignItems: "center",
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
  badgeWrap: {
    marginBottom: "20px",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#dcfce7",
    color: "#15803d",
    padding: "8px 24px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "15px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: "16px",
  },
  text: {
    fontSize: "15px",
    color: "#34495e",
    lineHeight: "1.8",
    marginBottom: "24px",
  },
  infoBox: {
    backgroundColor: "#0B3C5D",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "28px",
  },
  infoText: {
    color: "#fff",
    fontSize: "15px",
    lineHeight: "1.7",
    margin: 0,
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