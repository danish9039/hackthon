import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}/>
              <Route path='/login' element= {<Login/>} />
    <Route path='/register' element= {<Register/>} />
  
      </Routes>
    </div>
  )
}

export default App