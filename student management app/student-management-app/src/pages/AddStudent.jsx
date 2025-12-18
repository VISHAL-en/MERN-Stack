import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './addstudent.css'

export default function AddStudent({ onAdd }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [course, setCourse] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function validateEmail(value) {
    return /^\S+@\S+\.\S+$/.test(value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required.'
    if (email && !validateEmail(email)) errs.email = 'Enter a valid email.'

    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    onAdd({ name: name.trim(), age: age.trim(), course: course.trim(), email: email.trim() })
    setName('')
    setAge('')
    setCourse('')
    setEmail('')
    navigate('/students')
  }

  return (
    <section className="add-student">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>
            Name:
            <input value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>
        </div>
        <div className="row">
          <label>
            Age:
            <input value={age} onChange={(e) => setAge(e.target.value)} />
          </label>

          <label>
            Course:
            <input value={course} onChange={(e) => setCourse(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={!!errors.email} />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>
        </div>
        <div className="actions">
          <button type="submit">Add</button>
          <div className="help"></div>
        </div>
      </form>
    </section>
  )
}
