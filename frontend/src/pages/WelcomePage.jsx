import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function WelcomePage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PackLane Canada — Welcome";
  }, []);

  return (
    <div style={styles.page}>
      {/* TOP NAV BAR */}
      <div style={styles.navBar}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <img src="/images/packlane.jpg" alt="PackLane Logo" style={styles.navLogo} />
            <span style={styles.navName}>PackLane Canada</span>
          </div>
          <span style={styles.navTag}>Employee Acceptance Portal</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <img src="/images/packlane.jpg" alt="PackLane" style={styles.heroImg} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to<br />PackLane Canada</h1>
          <p style={styles.heroSub}>
            Your official employee acceptance portal. Check your status and access your digital work ID.
          </p>
          <button
            style={styles.heroBtn}
            onMouseOver={e => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 30px rgba(255,255,255,0.4)";
            }}
            onMouseOut={e => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(255,255,255,0.2)";
            }}
            onClick={() => navigate(`/status/${token}`)}
          >
            View My Status →
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>

        {/* STATS ROW */}
        <div style={styles.statsRow}>
          {[
            { num: "2015", label: "Founded" },
            { num: "50K+", label: "Happy Clients" },
            { num: "100+", label: "Box Styles" },
            { num: "🇨🇦", label: "Based in Canada" },
          ].map((s, i) => (
            <div key={i} style={styles.statCard}>
              <span style={styles.statNum}>{s.num}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ABOUT */}
        <div style={styles.section}>
          <div style={styles.sectionLabel}>WHO WE ARE</div>
          <h2 style={styles.sectionTitle}>About PackLane</h2>
          <p style={styles.text}>
            Packlane is a custom packaging company based in Canada, founded in 2015.
            They offer a range of services for creating custom printed boxes, including
            mailers, shipping boxes, and product boxes, with options for various materials
            and sizes. Packlane provides a user-friendly online platform for ordering and
            designing packaging, allowing customers to visualize their designs in 3D and
            receive instant quotes. They have a strong reputation in the industry, working
            with numerous brands and offering low minimum order quantities and fast
            turnaround times.
          </p>
        </div>

        {/* MISSION & VISION CARDS */}
        <div style={styles.cardsRow}>
          <div style={styles.card}>
            <img src="/images/packlane2.png" alt="Mission" style={styles.cardImg} />
            <div style={styles.cardBody}>
              <div style={styles.cardIcon}>🎯</div>
              <h3 style={styles.cardTitle}>Our Mission</h3>
              <p style={styles.cardText}>
                To develop and produce a diversified portfolio of packaging products,
                technically lead the industry, continuously improve production quality,
                and increase clients' satisfaction through optimal utilization of
                the company's resources.
              </p>
            </div>
          </div>
          <div style={styles.card}>
            <img src="/images/packlane3.jpg" alt="Vision" style={styles.cardImg} />
            <div style={styles.cardBody}>
              <div style={styles.cardIcon}>🌟</div>
              <h3 style={styles.cardTitle}>Our Vision</h3>
              <p style={styles.cardText}>
                To become a leading world class organization and strengthen our position
                as a leading company in the packaging business, maintaining the highest
                quality standards ensuring our valuable clients' satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* CTA BOTTOM */}
        <div style={styles.ctaBox}>
          <div style={styles.ctaLeft}>
            <h2 style={styles.ctaTitle}>Ready to get started?</h2>
            <p style={styles.ctaSub}>
              If you have received an acceptance link from our HR team,
              click below to view your status and digital work ID.
            </p>
          </div>
          <button
            style={styles.ctaBtn}
            onMouseOver={e => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 30px rgba(41,128,185,0.5)";
            }}
            onMouseOut={e => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(41,128,185,0.3)";
            }}
            onClick={() => navigate(`/status/${token}`)}
          >
            View My Status →
          </button>
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
  },

  // NAV
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
    letterSpacing: "0.3px",
  },
  navTag: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    fontWeight: "500",
  },

  // HERO
  hero: {
    position: "relative",
    height: "480px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(11,60,93,0.88) 0%, rgba(26,111,168,0.75) 100%)",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "0 24px",
    maxWidth: "700px",
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
    letterSpacing: "0.5px",
  },
  heroTitle: {
    color: "#fff",
    fontSize: "52px",
    fontWeight: "800",
    margin: "0 0 16px",
    lineHeight: "1.15",
    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
  },
  heroSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "17px",
    lineHeight: "1.7",
    marginBottom: "32px",
  },
  heroBtn: {
    padding: "15px 44px",
    fontSize: "17px",
    fontWeight: "700",
    borderRadius: "999px",
    border: "2px solid rgba(255,255,255,0.8)",
    cursor: "pointer",
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "#fff",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(255,255,255,0.2)",
    letterSpacing: "0.5px",
  },

  // MAIN
  main: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "48px 24px",
  },

  // STATS
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "56px",
  },
  statCard: {
    background: "linear-gradient(135deg, #0B3C5D 0%, #2980b9 100%)",
    borderRadius: "16px",
    padding: "28px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    boxShadow: "0 4px 20px rgba(11,60,93,0.2)",
  },
  statNum: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "800",
  },
  statLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "13px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  // ABOUT SECTION
  section: {
    marginBottom: "48px",
  },
  sectionLabel: {
    color: "#2980b9",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0B3C5D",
    marginBottom: "16px",
    margin: "0 0 16px",
  },
  text: {
    fontSize: "16px",
    color: "#4a5568",
    lineHeight: "1.85",
  },

  // CARDS
  cardsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "56px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(11,60,93,0.1)",
    border: "1px solid rgba(11,60,93,0.08)",
  },
  cardImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "24px",
  },
  cardIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0B3C5D",
    margin: "0 0 12px",
  },
  cardText: {
    fontSize: "15px",
    color: "#4a5568",
    lineHeight: "1.75",
    margin: 0,
  },

  // CTA BOX
  ctaBox: {
    background: "linear-gradient(135deg, #0B3C5D 0%, #2980b9 100%)",
    borderRadius: "24px",
    padding: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "32px",
    boxShadow: "0 8px 40px rgba(11,60,93,0.25)",
    flexWrap: "wrap",
  },
  ctaLeft: {
    flex: 1,
    minWidth: "250px",
  },
  ctaTitle: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "800",
    margin: "0 0 12px",
  },
  ctaSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "16px",
    lineHeight: "1.7",
    margin: 0,
  },
  ctaBtn: {
    padding: "16px 40px",
    fontSize: "17px",
    fontWeight: "700",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#0B3C5D",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(41,128,185,0.3)",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  // FOOTER
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