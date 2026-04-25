import { useParams, useNavigate } from 'react-router-dom';

export default function StatusPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>✅ Accepted</div>
        <h1 style={styles.title}>Your Application Status</h1>
        <p style={styles.text}>Congratulations! Your application has been reviewed and approved. You are officially part of our team.</p>
        <button style={styles.btn} onClick={() => navigate(`/congratulations/${token}`)}>
          Continue →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: '#fff', borderRadius: 20, padding: 48, textAlign: 'center', maxWidth: 440, width: '90%', boxShadow: '0 4px 32px rgba(0,0,0,0.08)' },
  badge: { display: 'inline-block', background: '#dcfce7', color: '#15803d', padding: '8px 20px', borderRadius: 999, fontWeight: 700, marginBottom: 24, fontSize: 15 },
  title: { fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 16 },
  text: { color: '#555', lineHeight: 1.7, marginBottom: 32 },
  btn: { padding: '14px 36px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 10, fontSize: 17, fontWeight: 600, cursor: 'pointer' }
};