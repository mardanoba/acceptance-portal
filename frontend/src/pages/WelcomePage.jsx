import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function WelcomePage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PackLane — Welcome";
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <img src="/images/packlane.jpg" alt="packlaneLogo" style={styles.logo} />
          <div>
            <h1 style={styles.companyName}>PackLane Canada</h1>
            <p style={styles.tagline}>Employee Acceptance Portal</p>
          </div>
        </div>

        {/* BANNER */}
        <img src="/images/packlane.jpg" alt="packlane" style={styles.banner} />

        <h2 style={styles.welcomeTitle}>Welcome to PackLane Canada </h2>
        

        {/* ABOUT */}
        <div style={styles.section}>
          <h3 style={styles.subHeader}>About the Company</h3>
          <p style={styles.text}>
            

Packlane is a custom packaging company based inCanada, founded in 2015. They offer a range of services for creating custom printed boxes, including mailers, shipping boxes, and product boxes, with options for various materials and sizes. Packlane provides a user-friendly online platform for ordering and designing packaging, allowing customers to visualize their designs in 3D and receive instant quotes. They have a strong reputation in the industry, working with numerous brands and offering low minimum order quantities and fast turnaround times.
          </p>

          <img src="/images/packlane2.png" alt="Mission" style={styles.sectionImg} />
          <h3 style={styles.subHeader}>Mission</h3>
          <p style={styles.text}>
            To develop and produce a diversified portfolio of agro-related products,
            technically lead the industry, continuously improve production, product quality,
            and increase clients' satisfaction through optimal utilization of the company's
            resources.
          </p>

          <img src="/images/packlane3.jpg" alt="Vision" style={styles.sectionImg} />
          <h3 style={styles.subHeader}>Vision</h3>
          <p style={styles.text}>
            To become a leading world class organization and strengthen our position as a
            leading  company in the packaging business, maintaining the highest
            quality standards of our products and services that will ensure our valuable
            clients' satisfaction.
          </p>
        </div>
<p style={styles.text}>
          This is your official employee acceptance portal. If you have received
          an acceptance link from our HR team, you can check your status below.
        </p>
        {/* VIEW STATUS BOX */}
        <div style={styles.statusBox}>
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
  banner: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "20px",
    height: "auto",
    objectFit: "cover",
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
  sectionImg: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "16px",
    height: "auto",
    objectFit: "cover",
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
    padding: "28px",
    textAlign: "center",
    marginTop: "20px",
  },
  statusText: {
    color: "#fff",
    fontSize: "16px",
    marginBottom: "16px",
    lineHeight: "1.6",
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