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
    document.title = "PackLane Canada — Check Status";
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
      {/* NAV */}
      <div style={styles.navBar}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <img src="/images/packlane.jpg" alt="PackLane Logo" style={styles.navLogo} />
            <span style={styles.navName}>PackLane Canada</span>
          </div>
          <span style={styles.navTag}>Employee Acceptance Portal</span>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🔍 Identity Verification</div>
          <h1 style={styles.heroTitle}>Check Your Status</h1>
          <p style={styles.heroSub}>
            Enter your Passport ID below to verify your identity and view your acceptance status.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.main}>
        <div style={styles.formCard}>
          <div style={styles.formIcon}>🪪</div>
          <h2 style={styles.formTitle}>Verify Your Identity</h2>
          <p style={styles.formText}>
            Please enter the Passport ID you provided during your application.
          </p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Passport ID</label>
            <input
              type="text"
              placeholder="Enter your Passport ID"
              value={passportId}
              onChange={e => setPassportId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheckStatus()}
              onFocus={e => {
                e.target.style.borderColor = "#2980b9";
                e.target.style.boxShadow = "0 0 0 3px rgba(41,128,185,0.15)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#ddd";
                e.target.style.boxShadow = "none";
              }}
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span>⚠️ {error}</span>
            </div>
          )}

          <button
            onClick={handleCheckStatus}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
            onMouseOver={e => { if (!loading) e.target.style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { e.target.style.transform = "translateY(0)"; }}
          >
            {loading ? "⏳ Checking..." : "Check Status →"}
          </button>
        </div>

        {/* INFO CARDS */}
        <div style={styles.infoRow}>
          {[
            { icon: "🔒", title: "Secure", text: "Your data is encrypted and protected" },
            { icon: "⚡", title: "Instant", text: "Results are shown immediately" },
            { icon: "✅", title: "Verified", text: "Only accepted employees can access" },
          ].map((item, i) => (
            <div key={i} style={styles.infoCard}>
              <span style={styles.infoIcon}>{item.icon}</span>
              <strong style={styles.infoTitle}>{item.title}</strong>
              <span style={styles.infoText}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p style={styles.footerText}>© 2026 PackLane Canada. All rights reserved. Employee Acceptance Portal.</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f0f6ff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  navBar: {
    background: "linear-gradient(135deg, #0B3C5D 0%, #1a6fa8 100%)",
    padding: "0 24px",
    boxShadow: "0 2px 12px rgba(11,60,93,0.3)",
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
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    fontWeight: "500",
  },
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #0B3C5D 0%, #2980b9 100%)",
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
    marginBottom: "20px",
  },
  heroTitle: {
    color: "#fff",
    fontSize: "44px",
    fontWeight: "800",
    margin: "0 0 16px",
    lineHeight: "1.2",
  },
  heroSub: {
    color: "rgba(255,255,255,0.85)",
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
  formCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "48px",
    boxShadow: "0 8px 40px rgba(11,60,93,0.12)",
    border: "1px solid rgba(11,60,93,0.08)",
    textAlign: "center",
    marginBottom: "32px",
  },
  formIcon: {
    fontSize: "56px",
    marginBottom: "16px",
  },
  formTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0B3C5D",
    margin: "0 0 12px",
  },
  formText: {
    fontSize: "15px",
    color: "#4a5568",
    lineHeight: "1.7",
    marginBottom: "28px",
  },
  inputGroup: {
    textAlign: "left",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontWeight: "700",
    fontSize: "13px",
    color: "#0B3C5D",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "14px 18px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "2px solid #ddd",
    outline: "none",
    transition: "all 0.3s",
    boxSizing: "border-box",
    backgroundColor: "#f8faff",
    color: "#0B3C5D",
  },
  errorBox: {
    backgroundColor: "#fff5f5",
    border: "1px solid #fed7d7",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#c0392b",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "16px",
    textAlign: "left",
  },
  button: {
    width: "100%",
    padding: "16px",
    fontSize: "17px",
    fontWeight: "700",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #0B3C5D 0%, #2980b9 100%)",
    color: "#fff",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(11,60,93,0.3)",
    letterSpacing: "0.3px",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px 16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    boxShadow: "0 2px 12px rgba(11,60,93,0.08)",
    border: "1px solid rgba(11,60,93,0.06)",
  },
  infoIcon: { fontSize: "28px" },
  infoTitle: { color: "#0B3C5D", fontSize: "15px" },
  infoText: { color: "#4a5568", fontSize: "13px", lineHeight: "1.5" },
  footer: {
    background: "#0B3C5D",
    padding: "20px 24px",
    textAlign: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "13px",
    margin: 0,
  },
};