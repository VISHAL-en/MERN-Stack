import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import AddStudent from './pages/AddStudent'
import StudentList from './pages/StudentList'
import About from './pages/About'
import Login from './pages/Login'

function App() {
  const [students, setStudents] = useState([])

  function addStudent(student) {
    setStudents((prev) => [
      ...prev,
      { id: Date.now().toString(), ...student },
    ])
  }

  function deleteStudent(id) {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home students={students} />} />
          <Route path="/add" element={<AddStudent onAdd={addStudent} />} />
          <Route path="/students" element={<StudentList students={students} onDelete={deleteStudent} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
