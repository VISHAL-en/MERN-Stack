import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './studentlist.css'

export default function StudentList({ students, onDelete = () => {} }) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return students
    return students.filter((s) => {
      return [s.name, s.email, s.course, s.age].join(' ').toLowerCase().includes(t)
    })
  }, [students, q])

  function handleDelete(id, name) {
    const ok = window.confirm(`Delete ${name || 'this student'}? This cannot be undone.`)
    if (ok) onDelete(id)
  }

  return (
    <section className="student-list">
      <div className="card header">
        <h2>Student List</h2>
        <div className="toolbar">
          <div className="search">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, email, or course" aria-label="Search students" />
          </div>
          <div className="meta">
            <div className="count">Showing {filtered.length} of {students.length}</div>
            <Link to="/add" className="btn primary">➕ Add</Link>
          </div>
        </div>
      </div>

      <div className="card table-wrapper">
        {filtered.length === 0 ? (
          <p className="muted">No students yet. Add one on the Add Student page.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Course</th>
                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.email || '—'}</td>
                  <td>{s.age || '—'}</td>
                  <td>{s.course || '—'}</td>
                  <td className="action">
                    <button className="delete-btn" onClick={() => handleDelete(s.id, s.name)} aria-label={`Delete ${s.name}`}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
