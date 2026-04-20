import React from 'react'
import Navbar from './components/shared/Navbar'
import { Route,Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Details from './components/Details'
import Company from './components/admin/Company'
import AddCompany from './components/admin/AddCompany'
import UpdateCompany from './components/admin/UpdateCompany'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicant from './components/admin/Applicant'

function App() {
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
      <Route path='/browse' element={<Browse/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='/admin/company'element={<Company/>}/>
      <Route path='/admin/addcompany' element={<AddCompany/>}/>
      <Route path='/admin/company/:id' element={<UpdateCompany/>}/>
      <Route path='/admin/jobs' element={<AdminJobs/>}/>
      <Route path='/admin/post/job' element={<PostJob/>}/>
      <Route path='admin/applicants/:id' element={<Applicant/>}/>
    </Routes>
    </div>
  )
}

export default App