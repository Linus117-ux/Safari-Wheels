import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



import './App.css';
import Testcomponent from './components/Testcomponent';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Getcar from './components/Getcar';
// import Navbar from './components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Book from './components/Book';
import Getbookings from './components/Getbookings';
// import React, { useState } from 'react'
import Addcar from './components/Addcar';
import Chatbot from './components/Chatbot';
import Mainnav from './components/Mainnav';
import AdminDashboard from './components/Admindashboard';

function App() {
   
  return (
    <div className='dark-theme'>
     {/* <h1>Linus enterprises</h1> */}
    <BrowserRouter>
   {/* nav goes here 
   <nav>
    <Link to="/test" className='btn btn-primary'>test</Link>
    <Link to="/signin" >Sign in</Link>
    <Link to="/signup">Sign up</Link>
    <Link to="/getcar">Getcar</Link>
    <Link to="/navbar">Navbar</Link>
   </nav> */} 
   {/* routes goes here  */}
<div className="layout">
  <Sidebar/>
<div className="main-content">


   <Routes>
    <Route path='/test' element={<Testcomponent/>} />
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/getcar' element={  <Getcar /> }/>
    <Route path='/addcar' element={<Addcar/>}/>
    
    <Route path="/" element={<Dashboard />} />
    <Route path='/book' element={<Book/>}/>
   <Route path='/getbookings' element={<Getbookings  />} />
   <Route path='/chatbot' element={<Chatbot />} />
   <Route path='/Mainnav' element={<Mainnav />} />
   <Route path='/admin' element={<AdminDashboard />} />
   </Routes>
</div>
   </div>

   </BrowserRouter>
    </div>
  );
}

export default App;
