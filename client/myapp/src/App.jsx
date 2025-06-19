// import { useState } from 'react'
import {BrowserRouter as Router , Route ,Routes} from 'react-router-dom'

import CustomPaginationActionsTable from './components/studentTable.jsx'
import StudentProfilePage from './pages/studentProfile.jsx'
import HomePage from './pages/home.jsx'
function App() {

  return ( 
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/studentprofile/:handle' element={<StudentProfilePage/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
