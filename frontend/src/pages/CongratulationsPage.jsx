import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function CongratulationsPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "SkyNet Malta — Congratulations";
    fetch(`${API}/api/employees/${token}`)
      .then(res => { if (!res.ok) throw new Error("Not found"); return res.json(); })
      .then(data => setEmployee(data))
      .catch(() => setError("Could not load your details."));
  }, [token]);

  if (error) return (
    <div style={styles.page}>
      <div style={styles.navBar}><div style={styles.navInner}><div style={styles.navBrand}><img src="/images/sky.webp" alt="SkyNet Malta" style={styles.navLogo} /><span style={styles.navName}>SkyNet Malta</span></div></div></div>
      <div style={styles.main}><div style={styles.card}><p style={{ color: "#c0392b", fontWeight: "bold" }}>{error}</p></div></div>
    </div>
  );

  if (!employee) return (
    <div style={styles.page}>
      <div style={styles.navBar}><div style={styles.navInner}><div style={styles.navBrand}><img src="/images/sky.webp" alt="SkyNet Malta" style={styles.navLogo} /><span style={styles.navName}>SkyNet Malta</span></div></div></div>
      <div style={styles.main}><div style={styles.card}><p>Loading...</p></div></div>
    </div>
  );

  return (
    <div style={styles.page}>
      {/* NAV */}
      <div style={styles.navBar}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <img src="/images/sky.webp" alt="SkyNet Malta Logo" style={styles.navLogo} />
            <span style={styles.navName}>SkyNet Malta</span>
          </div>
          <span style={styles.navTag}>Employee Acceptance Portal</span>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🎉 Accepted Employee</div>
          <h1 style={styles.heroTitle}>Congratulations,<br />{employee.full_name}!</h1>
          <p style={styles.heroSub}>
            You have officially been accepted to SkyNet Malta. You have now completed 50% of your application process. Welcome to the team!
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <div style={styles.card}>

          {/* PHOTO */}
          {employee.photo_url ? (
            <img src={employee.photo_url} alt={employee.full_name} style={styles.photo} />
          ) : (
            <div style={styles.photoPlaceholder}>👤</div>
          )}

          <div style={styles.acceptedBadge}>✅ Officially Accepted</div>

          {/* DETAILS */}
          <div style={styles.detailBox}>
            {[
              { label: "Full Name", value: employee.full_name },
              { label: "Passport ID", value: employee.passport_id },
              { label: "Work ID", value: employee.work_id },
              { label: "Work Type", value: employee.work_type },
              { label: "Member Since", value: new Date(employee.created_at).toLocaleDateString() },
            ].map((item, i) => (
              <div key={i} style={styles.detailRow}>
                <span style={styles.detailLabel}>{item.label}</span>
                <span style={styles.detailValue}>{item.value}</span>
              </div>
            ))}
          </div>

          <button
            style={styles.button}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(120,0,0,0.4)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(120,0,0,0.3)";
            }}
            onClick={() => navigate(`/work-id/${token}`)}
          >
            View My Digital Work ID →
          </button>
        </div>

        {/* BOTTOM CARDS */}
        <div style={styles.bottomRow}>
          {[
            { icon: "🏢", title: "Great Workplace", text: "Join a team of passionate professionals" },
            { icon: "📦", title: "Industry Leader", text: "World-class delivery solutions" },
            { icon: "🚀", title: "Growth", text: "Endless opportunities to grow your career" },
          ].map((item, i) => (
            <div key={i} style={styles.bottomCard}>
              <span style={styles.bottomIcon}>{item.icon}</span>
              <strong style={styles.bottomTitle}>{item.title}</strong>
              <span style={styles.bottomText}>{item.text}</span>
            </div>
          ))}
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
    padding: "72px 24px",
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
    maxWidth: "650px",
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
    marginBottom: "20px",
  },
  heroTitle: {
    color: "#fff",
    fontSize: "44px",
    fontWeight: "800",
    margin: "0 0 16px",
    lineHeight: "1.2",
    textShadow: "0 2px 12px rgba(0,0,0,0.25)",
  },
  heroSub: {
    color: "rgba(255,255,255,0.88)",
    fontSize: "17px",
    lineHeight: "1.7",
    margin: 0,
  },
  main: {
    flex: 1,
    maxWidth: "700px",
    width: "100%",
    margin: "0 auto",
    padding: "48px 24px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "48px",
    boxShadow: "0 8px 40px rgba(120,0,0,0.12)",
    border: "1px solid rgba(192,57,43,0.1)",
    textAlign: "center",
    marginBottom: "32px",
  },
  photo: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #7a0000",
    margin: "0 auto 20px",
    display: "block",
    boxShadow: "0 4px 20px rgba(120,0,0,0.2)",
  },
  photoPlaceholder: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    backgroundColor: "#fff8f8",
    border: "5px solid #7a0000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "52px",
    margin: "0 auto 20px",
  },
  acceptedBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #7a0000, #c0392b)",
    color: "#fff",
    padding: "8px 24px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px",
    marginBottom: "28px",
    boxShadow: "0 4px 12px rgba(120,0,0,0.3)",
  },
  detailBox: {
    backgroundColor: "#fff8f8",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "28px",
    border: "1px solid rgba(192,57,43,0.1)",
    textAlign: "left",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid rgba(192,57,43,0.06)",
  },
  detailLabel: {
    fontWeight: "700",
    color: "#7a0000",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  detailValue: {
    color: "#4a3030",
    fontWeight: "500",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "16px",
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
  bottomRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  bottomCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px 16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    boxShadow: "0 2px 12px rgba(120,0,0,0.08)",
    border: "1px solid rgba(192,57,43,0.08)",
  },
  bottomIcon: { fontSize: "28px" },
  bottomTitle: { color: "#7a0000", fontSize: "15px" },
  bottomText: { color: "#4a3030", fontSize: "13px", lineHeight: "1.5" },
  footer: {
    background: "#7a0000",
    padding: "20px 24px",
    textAlign: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.65)",
    fontSize: "13px",
    margin: 0,
  },
};