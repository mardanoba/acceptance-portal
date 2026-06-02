import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/sky.webp";

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function WorkIDPage() {
  const { token } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "SkyNet Malta — Digital ID";
    fetch(`${API}/api/employees/${token}`)
      .then(res => { if (!res.ok) throw new Error("Not found"); return res.json(); })
      .then(data => setEmployee(data))
      .catch(() => setError("Could not load your ID. Please check your link."));
  }, [token]);

  if (error) return (
    <div style={styles.page}>
      <div style={styles.navBar}><div style={styles.navInner}><div style={styles.navBrand}><img src="/images/sky.webp" alt="SkyNet Malta" style={styles.navLogo} /><span style={styles.navName}>SkyNet Malta</span></div></div></div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#c0392b", fontWeight: "bold" }}>{error}</p>
      </div>
    </div>
  );

  if (!employee) return (
    <div style={styles.page}>
      <div style={styles.navBar}><div style={styles.navInner}><div style={styles.navBrand}><img src="/images/sky.webp" alt="SkyNet Malta" style={styles.navLogo} /><span style={styles.navName}>SkyNet Malta</span></div></div></div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading Digital ID...</p>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      {/* NAV */}
      <div style={styles.navBar}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <img src="/images/skylogo.webp" alt="SkyNet Malta Logo" style={styles.navLogo} />
            <span style={styles.navName}>SkyNet Malta</span>
          </div>
          <span style={styles.navTag}>Employee Acceptance Portal</span>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🪪 Official Document</div>
          <h1 style={styles.heroTitle}>Digital Work ID</h1>
          <p style={styles.heroSub}>Your official SkyNet Malta employee identification card</p>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* ID CARD */}
        <div style={styles.idCard}>
          {/* CARD HEADER */}
          <div style={styles.cardHeader}>
            <img src={logo} alt="SkyNet Malta Logo" style={styles.cardLogo} />
            <div style={styles.cardHeaderText}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800" }}>SkyNet Malta</h2>
              <p style={{ margin: 0, fontSize: "13px", opacity: 0.85 }}>Official Employee Digital ID</p>
            </div>
            <div style={styles.cardBadge}>ACTIVE</div>
          </div>

          {/* CARD BODY */}
          <div style={styles.cardBody}>
            {/* PHOTO */}
            <div style={styles.photoSection}>
              {employee.photo_url ? (
                <img src={employee.photo_url} alt={employee.full_name} style={styles.photo} />
              ) : (
                <div style={styles.photoPlaceholder}>
                  <span style={{ fontSize: "52px" }}>👤</span>
                </div>
              )}
              <div style={styles.photoLabel}>EMPLOYEE</div>
            </div>

            {/* DETAILS */}
            <div style={styles.details}>
              {[
                { label: "Full Name", value: employee.full_name },
                { label: "Passport ID", value: employee.passport_id },
                { label: "Work ID", value: employee.work_id },
                { label: "Work Type", value: employee.work_type },
                { label: "Member Since", value: new Date(employee.created_at).toLocaleDateString() },
              ].map((item, i) => (
                <div key={i} style={styles.detailItem}>
                  <span style={styles.detailLabel}>{item.label}</span>
                  <span style={styles.detailValue}>{item.value}</span>
                </div>
              ))}
              <div style={styles.verifiedBadge}>✅ Verified Employee</div>
            </div>
          </div>

          {/* CARD FOOTER */}
          <div style={styles.cardFooter}>
            This card is the property of SkyNet Malta. If found, please return to the company office.
          </div>
        </div>

        {/* PRINT BUTTON */}
        <div style={styles.btnRow}>
          <button
            style={styles.printBtn}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(120,0,0,0.4)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(120,0,0,0.3)";
            }}
            onClick={() => window.print()}
          >
            🖨️ Print Digital ID
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p style={styles.footerText}>© 2026 SkyNet Malta. All rights reserved. Employee Acceptance Portal.</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fff5f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  navBar: {
    background: "linear-gradient(135deg, #7a0000 0%, #c0392b 100%)",
    padding: "0 24px",
    boxShadow: "0 2px 12px rgba(120,0,0,0.35)",
  },
  navInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    height: "68px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  navLogo: {
    width: "42px",
    height: "42px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "3px",
  },
  navName: {
    color: "#fff",
    fontWeight: "800",
    fontSize: "18px",
  },
  navTag: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "13px",
  },
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #7a0000 0%, #c0392b 100%)",
    padding: "60px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    top: "-50%",
    right: "-10%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    pointerEvents: "none",
  },
  heroContent: {
    textAlign: "center",
    maxWidth: "600px",
    position: "relative",
    zIndex: 1,
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  heroTitle: {
    color: "#fff",
    fontSize: "44px",
    fontWeight: "800",
    margin: "0 0 12px",
    textShadow: "0 2px 12px rgba(0,0,0,0.25)",
  },
  heroSub: {
    color: "rgba(255,255,255,0.88)",
    fontSize: "16px",
    margin: 0,
  },
  main: {
    flex: 1,
    maxWidth: "780px",
    width: "100%",
    margin: "0 auto",
    padding: "48px 24px",
  },
  idCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(120,0,0,0.15)",
    border: "1px solid rgba(192,57,43,0.12)",
    marginBottom: "24px",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #7a0000 0%, #c0392b 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "20px 28px",
    gap: "16px",
  },
  cardLogo: {
    width: "56px",
    height: "56px",
    objectFit: "contain",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "5px",
    flexShrink: 0,
  },
  cardHeaderText: {
    flex: 1,
    textAlign: "left",
  },
  cardBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "#fff",
    padding: "4px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  cardBody: {
    display: "flex",
    padding: "32px 28px",
    gap: "32px",
    flexWrap: "wrap",
  },
  photoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },
  photo: {
    width: "160px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "4px solid #7a0000",
    boxShadow: "0 4px 20px rgba(120,0,0,0.2)",
  },
  photoPlaceholder: {
    width: "160px",
    height: "200px",
    borderRadius: "12px",
    border: "4px solid #7a0000",
    backgroundColor: "#fff8f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  photoLabel: {
    background: "linear-gradient(135deg, #7a0000, #c0392b)",
    color: "#fff",
    padding: "4px 16px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    justifyContent: "center",
    minWidth: "200px",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    padding: "12px 0",
    borderBottom: "1px solid rgba(192,57,43,0.08)",
  },
  detailLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#c0392b",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  detailValue: {
    fontSize: "17px",
    color: "#7a0000",
    fontWeight: "600",
  },
  verifiedBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #7a0000, #c0392b)",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px",
    marginTop: "12px",
    boxShadow: "0 4px 12px rgba(120,0,0,0.3)",
    alignSelf: "flex-start",
  },
  cardFooter: {
    borderTop: "1px solid rgba(192,57,43,0.08)",
    padding: "16px 28px",
    fontSize: "13px",
    color: "#4a3030",
    textAlign: "center",
    backgroundColor: "#fff8f8",
  },
  btnRow: {
    display: "flex",
    justifyContent: "center",
  },
  printBtn: {
    padding: "16px 48px",
    fontSize: "17px",
    fontWeight: "700",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #7a0000 0%, #c0392b 100%)",
    color: "#fff",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(120,0,0,0.3)",
  },
  footer: {
    background: "#7a0000",
    padding: "20px 24px",
    textAlign: "center",
    marginTop: "auto",
  },
  footerText: {
    color: "rgba(255,255,255,0.65)",
    fontSize: "13px",
    margin: 0,
  },
};