import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}

    if (!email) errs.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email.'

    if (!password) errs.password = 'Password is required.'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters.'

    setErrors(errs)

    if (Object.keys(errs).length === 0) {
      // Fake authentication for demo purposes
      // In a real app you'd call an API and handle tokens
      navigate('/')
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>

        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
          {errors.password && <small className="error">{errors.password}</small>}
        </label>

        <button type="submit" className="btn">Sign in</button>

        <p className="help">For demo, use any credentials. You'll be redirected to Home on success.</p>
      </form>
    </div>
  )
}
