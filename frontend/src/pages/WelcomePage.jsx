import { useParams, useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.emoji}>🎉</div>
        <h1 style={styles.title}>Welcome!</h1>
        <p style={styles.text}>You have been accepted to our company. We're thrilled to have you on board.</p>
        <button style={styles.btn} onClick={() => navigate(`/status/${token}`)}>
          View My Status →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: '#fff', borderRadius: 20, padding: 48, textAlign: 'center', maxWidth: 440, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 36, fontWeight: 800, color: '#1a1a2e', margin: '0 0 16px' },
  text: { color: '#555', fontSize: 17, lineHeight: 1.6, marginBottom: 32 },
  btn: { padding: '14px 36px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 10, fontSize: 17, fontWeight: 600, cursor: 'pointer' }
};