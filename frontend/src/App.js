import React from 'react'
import "./App.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {LoginPage, SignupPage, ActivationPage} from "./Routes.js"

function App() {
  return (
    <div>
       <BrowserRouter>
         <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/sign-up' element={<SignupPage/>}/>
          <Route path='/activation/:url' element={<ActivationPage/>}/>
         </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App