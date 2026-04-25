import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Emirates Food Industries — Welcome";
  }, []);

  const imageStyle = {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "20px",
    height: "auto",
    objectFit: "cover",
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <img src="/images/emiratesfood.webp" alt="Emirates Food Industries" style={styles.logo} />
          <div>
            <h1 style={styles.companyName}>Emirates Food Industries</h1>
            <p style={styles.tagline}>Employee Acceptance Portal</p>
          </div>
        </div>

        {/* BANNER */}
        <img src="/images/emiratesfood.webp" alt="Emirates Food" style={imageStyle} />

        <h2 style={styles.welcomeTitle}>Welcome to Emirates Food Industries</h2>
        <p style={styles.text}>
          This is your official acceptance portal. If you have received an acceptance link,
          you can view your status and digital work ID below.
        </p>

        {/* ABOUT */}
        <div style={styles.section}>
          <h3 style={styles.subHeader}>About the Company</h3>
          <p style={styles.text}>
            Emirates Food Industries (EFI) is one of the leading holding companies operating
            in the food / dairy / agriculture industries in the UAE. Headquartered in Abu Dhabi,
            EFI was established to support the Abu Dhabi government's agricultural road map and
            food security program. EFI's key subsidiaries include National Feed and Flour
            Production and Marketing Co. (NFFPM), National Dairy Farms (NDF), Masaken Dairy
            Farms (MDF), National Bags (NB), and HAYATNA — EFI's home-grown dairy brand
            produced 100% in the UAE.
          </p>

          <img src="/images/emiratesfood1.png" alt="Mission" style={imageStyle} />
          <h3 style={styles.subHeader}>Mission</h3>
          <p style={styles.text}>
            To develop and produce a diversified portfolio of agro-related products, technically
            lead the industry, continuously improve production, product quality, and increase
            clients' satisfaction through optimal utilization of the company's resources.
          </p>

          <img src="/images/emiratesfood2.jpg" alt="Vision" style={imageStyle} />
          <h3 style={styles.subHeader}>Vision</h3>
          <p style={styles.text}>
            To become a leading world class organization and strengthen our position as a leading
            Middle Eastern company in the agrofood business, maintaining the highest quality
            standards of our products and services.
          </p>
        </div>

        {/* VIEW STATUS BUTTON */}
        <div style={styles.statusBox}>
          <p style={styles.statusText}>Have you received an acceptance link?</p>
          <button
            style={styles.button}
            onMouseOver={e => e.target.style.backgroundColor = "#1F618D"}
            onMouseOut={e => e.target.style.backgroundColor = "#2980b9"}
            onClick={() => navigate(`/status/${token}`)}
          >
            View My Status →
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
    alignItems: "flex-start",
    padding: "30px 20px",
  },
  container: {
    width: "95%",
    maxWidth: "750px",
    backgroundColor: "#fff8e7",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: "2px solid #0B3C5D",
  },
  logo: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "4px",
    border: "1px solid #ddd",
  },
  companyName: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#0B3C5D",
  },
  tagline: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
  },
  welcomeTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: "12px",
    textAlign: "center",
  },
  text: {
    fontSize: "15px",
    color: "#34495e",
    lineHeight: "1.8",
    marginBottom: "16px",
  },
  section: {
    textAlign: "left",
    margin: "24px 0",
  },
  subHeader: {
    color: "#0B3C5D",
    marginBottom: "8px",
    fontWeight: "700",
    fontSize: "17px",
  },
  statusBox: {
    backgroundColor: "#0B3C5D",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center",
    marginTop: "20px",
  },
  statusText: {
    color: "#fff",
    fontSize: "16px",
    marginBottom: "14px",
  },
  button: {
    padding: "12px 32px",
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