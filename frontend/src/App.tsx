import { useState } from 'react'
import Dashboard from './pages/Dashboard.tsx'
import Signin from './pages/Signin.tsx'
import { BrowserRouter , Route , Routes } from 'react-router'
import Signup from './pages/Signup.tsx'
import AuthLayout from './components/AuthLayout.tsx'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= { <AuthLayout element={<Dashboard/>} />} />
      <Route path='/signin' element= {<Signin/>} />
      <Route path='/signup' element= {<Signup/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
