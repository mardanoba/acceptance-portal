import { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminPage() {
  const [form, setForm] = useState({ passport_id: '', full_name: '', work_id: '' });
  const [photo, setPhoto] = useState(null);
  const [generatedLink, setGeneratedLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('passport_id', form.passport_id);
      data.append('full_name', form.full_name);
      data.append('work_id', form.work_id);
      if (photo) data.append('photo', photo);

      const res = await axios.post(`${API}/api/employees`, data);
      setGeneratedLink(res.data.link);
    } catch (err) {
      alert('Error creating employee');
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
      <div style={styles.card}>
        <h1 style={styles.title}>Admin — Add Employee</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input style={styles.input} value={form.full_name}
            onChange={e => setForm({...form, full_name: e.target.value})} required />

          <label style={styles.label}>Passport ID</label>
          <input style={styles.input} value={form.passport_id}
            onChange={e => setForm({...form, passport_id: e.target.value})} required />

          <label style={styles.label}>Work ID</label>
          <input style={styles.input} value={form.work_id}
            onChange={e => setForm({...form, work_id: e.target.value})} required />

          <label style={styles.label}>Photo</label>
          <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])}
            style={styles.input} />

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating...' : 'Generate Link'}
          </button>
        </form>

        {generatedLink && (
          <div style={styles.linkBox}>
            <p style={{marginBottom: 8, fontWeight: 600}}>✅ Link generated! Send this to the employee:</p>
            <p style={styles.linkText}>{generatedLink}</p>
            <button onClick={copyLink} style={styles.copyBtn}>
              {copied ? '✅ Copied!' : 'Copy Link'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { background: '#fff', borderRadius: 16, padding: 40, maxWidth: 480, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 28, color: '#1a1a2e' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { fontWeight: 600, fontSize: 14, color: '#555' },
  input: { padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, outline: 'none' },
  btn: { marginTop: 8, padding: '12px 0', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  linkBox: { marginTop: 28, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: 20 },
  linkText: { wordBreak: 'break-all', color: '#166534', fontSize: 13, margin: '8px 0' },
  copyBtn: { padding: '8px 20px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }
};