import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import About from './Components/About/About'

function MainPage() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <main>
      <section><Home /></section>
    </main>
    </>
  )
}

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about-developer" element={<About />} />
      </Routes>
    </div>
  )
}
export default App
