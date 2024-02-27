import React from 'react'
import "./App.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {LoginPage} from "./Routes.js"

function App() {
  return (
    <div>
       <BrowserRouter>
         <Routes>
          <Route path='/login' element={<LoginPage/>}/>
         </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App