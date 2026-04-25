import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function WorkIDPage() {
  const { token } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/api/employees/${token}`)
      .then(res => setEmployee(res.data))
      .catch(() => setError('Could not load your ID. Please check your link.'));
  }, [token]);

  if (error) return <div style={styles.page}><p style={{color:'red'}}>{error}</p></div>;
  if (!employee) return <div style={styles.page}><p>Loading your ID card...</p></div>;

  return (
    <div style={styles.page}>
      <div style={styles.idCard}>
        <div style={styles.header}>
          <span style={styles.company}>🏢 COMPANY NAME</span>
          <span style={styles.idLabel}>EMPLOYEE ID</span>
        </div>
        {employee.photo_url && (
          <img src={employee.photo_url} alt="Employee" style={styles.photo} />
        )}
        <h2 style={styles.name}>{employee.full_name}</h2>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Work ID</span>
          <span style={styles.infoValue}>{employee.work_id}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Passport ID</span>
          <span style={styles.infoValue}>{employee.passport_id}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Member since</span>
          <span style={styles.infoValue}>{new Date(employee.created_at).toLocaleDateString()}</span>
        </div>
        <div style={styles.footer}>✅ Verified Employee</div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#e8eaf6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  idCard: { background: '#fff', borderRadius: 20, overflow: 'hidden', maxWidth: 360, width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' },
  header: { background: '#1a1a2e', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  company: { color: '#fff', fontWeight: 700, fontSize: 15 },
  idLabel: { color: '#a5b4fc', fontSize: 12, fontWeight: 600, letterSpacing: 1 },
  photo: { width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '28px auto 16px', border: '4px solid #4F46E5' },
  name: { textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#1a1a2e', margin: '0 0 20px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 24px', borderTop: '1px solid #f1f5f9' },
  infoLabel: { color: '#888', fontSize: 13 },
  infoValue: { color: '#1a1a2e', fontWeight: 600, fontSize: 13 },
  footer: { background: '#f0fdf4', color: '#15803d', textAlign: 'center', padding: 16, fontWeight: 700, fontSize: 14 }
};