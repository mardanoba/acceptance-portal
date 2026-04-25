import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/packlane.jpg';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminPage() {
  const [form, setForm] = useState({ passport_id: '', full_name: '', work_id: '' });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [generatedLink, setGeneratedLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('passport_id', form.passport_id);
      data.append('full_name', form.full_name);
      data.append('work_id', form.work_id);
      if (photo) data.append('photo', photo);
      const res = await axios.post(`${API}/api/employees`, data);
      setGeneratedLink(res.data.link);
    } catch (err) {
      setError('Error creating employee. Please try again.');
    }
    setLoading(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.page}>
      {/* NAV */}
      <div style={styles.navBar}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <img src={logo} alt="PackLane Logo" style={styles.navLogo} />
            <span style={styles.navName}>PackLane Canada</span>
          </div>
          <span style={styles.navTag}>Admin Portal</span>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🔐 Admin Access</div>
          <h1 style={styles.heroTitle}>Employee Management</h1>
          <p style={styles.heroSub}>
            Add new employees and generate their acceptance links from here.
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <div style={styles.grid}>

          {/* FORM CARD */}
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <span style={styles.formIcon}>👤</span>
              <div>
                <h2 style={styles.formTitle}>Add New Employee</h2>
                <p style={styles.formSub}>Fill in the details to generate an acceptance link</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* FULL NAME */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  style={styles.input}
                  placeholder="e.g. John Smith"
                  value={form.full_name}
                  onChange={e => setForm({ ...form, full_name: e.target.value })}
                  onFocus={e => { e.target.style.borderColor = "#2980b9"; e.target.style.boxShadow = "0 0 0 3px rgba(41,128,185,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                  required
                />
              </div>

              {/* PASSPORT ID */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Passport ID</label>
                <input
                  style={styles.input}
                  placeholder="e.g. AB1234567"
                  value={form.passport_id}
                  onChange={e => setForm({ ...form, passport_id: e.target.value })}
                  onFocus={e => { e.target.style.borderColor = "#2980b9"; e.target.style.boxShadow = "0 0 0 3px rgba(41,128,185,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                  required
                />
              </div>

              {/* WORK ID */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Work ID</label>
                <input
                  style={styles.input}
                  placeholder="e.g. PKL-2026-001"
                  value={form.work_id}
                  onChange={e => setForm({ ...form, work_id: e.target.value })}
                  onFocus={e => { e.target.style.borderColor = "#2980b9"; e.target.style.boxShadow = "0 0 0 3px rgba(41,128,185,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "#ddd"; e.target.style.boxShadow = "none"; }}
                  required
                />
              </div>

              {/* PHOTO */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Employee Photo</label>
                <div style={styles.photoUploadBox}>
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" style={styles.photoPreview} />
                  ) : (
                    <div style={styles.photoPlaceholder}>
                      <span style={{ fontSize: "36px" }}>📷</span>
                      <span style={styles.photoPlaceholderText}>Click to upload photo</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={styles.fileInput}
                  />
                </div>
                {photo && <p style={styles.fileName}>✅ {photo.name}</p>}
              </div>

              {error && (
                <div style={styles.errorBox}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                style={{
                  ...styles.submitBtn,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                disabled={loading}
                onMouseOver={e => { if (!loading) e.target.style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { e.target.style.transform = "translateY(0)"; }}
              >
                {loading ? '⏳ Generating...' : '🔗 Generate Acceptance Link'}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div style={styles.rightCol}>
            {/* GENERATED LINK */}
            {generatedLink ? (
              <div style={styles.linkCard}>
                <div style={styles.linkCardHeader}>
                  <span style={styles.linkCardIcon}>✅</span>
                  <div>
                    <h3 style={styles.linkCardTitle}>Link Generated!</h3>
                    <p style={styles.linkCardSub}>Send this link to the employee</p>
                  </div>
                </div>
                <div style={styles.linkBox}>
                  <p style={styles.linkText}>{generatedLink}</p>
                </div>
                <button
                  onClick={copyLink}
                  style={styles.copyBtn}
                  onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={e => e.target.style.transform = "translateY(0)"}
                >
                  {copied ? '✅ Copied to Clipboard!' : '📋 Copy Link'}
                </button>
              </div>
            ) : (
              <div style={styles.emptyCard}>
                <span style={styles.emptyIcon}>🔗</span>
                <h3 style={styles.emptyTitle}>No Link Yet</h3>
                <p style={styles.emptyText}>
                  Fill in the employee details and click Generate to create an acceptance link.
                </p>
              </div>
            )}

            {/* TIPS CARD */}
            <div style={styles.tipsCard}>
              <h3 style={styles.tipsTitle}>📋 Instructions</h3>
              <div style={styles.tipsList}>
                {[
                  "Enter the employee's full legal name",
                  "Enter their passport ID exactly as it appears",
                  "Assign a unique Work ID for this employee",
                  "Upload a clear passport-style photo",
                  "Copy the generated link and send it to the employee",
                  "The employee uses the link to access their digital ID",
                ].map((tip, i) => (
                  <div key={i} style={styles.tipItem}>
                    <span style={styles.tipNum}>{i + 1}</span>
                    <span style={styles.tipText}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p style={styles.footerText}>© 2026 PackLane Canada. All rights reserved. Admin Portal.</p>
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
  },
  heroSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "16px",
    margin: 0,
    lineHeight: "1.7",
  },
  main: {
    flex: 1,
    maxWidth: "1100px",
    width: "100%",
    margin: "0 auto",
    padding: "48px 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "28px",
    alignItems: "start",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "36px",
    boxShadow: "0 8px 40px rgba(11,60,93,0.12)",
    border: "1px solid rgba(11,60,93,0.08)",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "28px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f0f6ff",
  },
  formIcon: {
    fontSize: "40px",
  },
  formTitle: {
    margin: "0 0 4px",
    fontSize: "20px",
    fontWeight: "800",
    color: "#0B3C5D",
  },
  formSub: {
    margin: 0,
    fontSize: "13px",
    color: "#4a5568",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontWeight: "700",
    fontSize: "12px",
    color: "#0B3C5D",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "13px 16px",
    borderRadius: "12px",
    border: "2px solid #ddd",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s",
    backgroundColor: "#f8faff",
    color: "#0B3C5D",
    boxSizing: "border-box",
    width: "100%",
  },
  photoUploadBox: {
    position: "relative",
    border: "2px dashed #2980b9",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    backgroundColor: "#f8faff",
    minHeight: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  photoPreview: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  photoPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "24px",
  },
  photoPlaceholderText: {
    color: "#2980b9",
    fontSize: "14px",
    fontWeight: "600",
  },
  fileInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  fileName: {
    fontSize: "13px",
    color: "#2980b9",
    fontWeight: "600",
    margin: "4px 0 0",
  },
  errorBox: {
    backgroundColor: "#fff5f5",
    border: "1px solid #fed7d7",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#c0392b",
    fontWeight: "600",
    fontSize: "14px",
  },
  submitBtn: {
    padding: "16px",
    fontSize: "16px",
    fontWeight: "700",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #0B3C5D 0%, #2980b9 100%)",
    color: "#fff",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(11,60,93,0.3)",
    marginTop: "8px",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  linkCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 8px 40px rgba(11,60,93,0.12)",
    border: "1px solid rgba(11,60,93,0.08)",
  },
  linkCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
  },
  linkCardIcon: {
    fontSize: "36px",
  },
  linkCardTitle: {
    margin: "0 0 4px",
    fontSize: "18px",
    fontWeight: "800",
    color: "#0B3C5D",
  },
  linkCardSub: {
    margin: 0,
    fontSize: "13px",
    color: "#4a5568",
  },
  linkBox: {
    backgroundColor: "#f0f6ff",
    border: "2px solid rgba(11,60,93,0.15)",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  },
  linkText: {
    wordBreak: "break-all",
    color: "#0B3C5D",
    fontSize: "13px",
    margin: 0,
    lineHeight: "1.6",
    fontWeight: "500",
  },
  copyBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "700",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #0B3C5D 0%, #2980b9 100%)",
    color: "#fff",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(11,60,93,0.3)",
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "40px 32px",
    boxShadow: "0 8px 40px rgba(11,60,93,0.12)",
    border: "2px dashed rgba(11,60,93,0.15)",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "16px",
  },
  emptyTitle: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#0B3C5D",
    margin: "0 0 8px",
  },
  emptyText: {
    fontSize: "14px",
    color: "#4a5568",
    lineHeight: "1.7",
    margin: 0,
  },
  tipsCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 8px 40px rgba(11,60,93,0.12)",
    border: "1px solid rgba(11,60,93,0.08)",
  },
  tipsTitle: {
    fontSize: "17px",
    fontWeight: "800",
    color: "#0B3C5D",
    margin: "0 0 20px",
  },
  tipsList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  tipItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  tipNum: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #0B3C5D, #2980b9)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tipText: {
    fontSize: "14px",
    color: "#4a5568",
    lineHeight: "1.6",
  },
  footer: {
    background: "#0B3C5D",
    padding: "20px 24px",
    textAlign: "center",
    marginTop: "auto",
  },
  footerText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "13px",
    margin: 0,
  },
};