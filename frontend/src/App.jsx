import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import SOSButton from './pages/SOSButton'
import Maps from './pages/Maps'
import News from './pages/News'
import LocationMap from './pages/LocationMap'
const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}/>
              <Route path='/login' element= {<Login/>} />
    <Route path='/register' element= {<Register/>} />
    <Route path='/sos' element={<SOSButton/>}/>
    <Route path='/nearby' element={<Maps/>}/>
    <Route path='/news' element={<News/>}/>
  <Route path='/location' element={<LocationMap/>}/>
       </Routes>
    </div>
  )
}

export default App