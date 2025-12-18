import { Link } from 'react-router-dom'
import './home.css'

export default function Home({ students = [] }) {
  const total = students.length
  const recent = [...students].slice(-5).reverse()

  return (
    <section className="home">
      <div className="hero card">
        <div>
          <h2>Welcome to the Student Management Dashboard</h2>
          <p className="lead">Quickly add and manage students, view lists, and track activity.</p>
          <div className="actions">
            <Link to="/add" className="btn primary"><span className="btn-emoji" aria-hidden="true">➕</span>Add Student</Link>
            <Link to="/students" className="btn outline"><span className="btn-emoji" aria-hidden="true">🎓</span>View Students</Link>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total students</div>
          </div>
          <div className="stat">
            <div className="stat-value">{recent.length}</div>
            <div className="stat-label">Recent</div>
          </div>
        </div>
      </div>

      <div className="card recent">
        <h3>Recent students</h3>
        {recent.length === 0 ? (
          <p className="muted">No students yet — add your first student.</p>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Enrolled</th></tr>
            </thead>
            <tbody>
              {recent.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{new Date(Number(s.id)).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
