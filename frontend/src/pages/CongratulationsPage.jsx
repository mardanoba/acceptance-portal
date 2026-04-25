import { useParams, useNavigate } from 'react-router-dom';

export default function CongratulationsPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.confetti}>🥳</div>
        <h1 style={styles.title}>Congratulations!</h1>
        <p style={styles.text}>You're officially a member of our company. Your work ID card is ready.</p>
        <button style={styles.btn} onClick={() => navigate(`/work-id/${token}`)}>
          View My Work ID →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: '#fff', borderRadius: 20, padding: 48, textAlign: 'center', maxWidth: 440, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' },
  confetti: { fontSize: 72, marginBottom: 16 },
  title: { fontSize: 36, fontWeight: 800, color: '#1a1a2e', marginBottom: 16 },
  text: { color: '#555', fontSize: 17, lineHeight: 1.6, marginBottom: 32 },
  btn: { padding: '14px 36px', background: '#f97316', color: '#fff', border: 'none', borderRadius: 10, fontSize: 17, fontWeight: 600, cursor: 'pointer' }
};