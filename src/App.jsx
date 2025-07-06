import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
function MainPage() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Navbar /> */}
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
