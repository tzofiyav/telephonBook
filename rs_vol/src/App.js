import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Manager from './pages/manager/manager';

import { Outlet, Switch,Link } from "react-router-dom";
import Login from './pages/login/login';
import Volunteer from './pages/volunteer/volunteer';
import Logo from "../src/images/logo.png" ;
import {logout } from "./firebase_db"
import Contact from './pages/contact/contact';

const Layout = () => {
  return (
    <>
      <nav>
        {/* <ul>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
  </ul>*/ }
      </nav>
      <Outlet />
    </>
  )
};


function App() {
  // const [email, setEmail] = useState("")
  const [currentPage, setCurrentPage] = useState('contact');
  // const [role, setRole] = useState("noLogin")
    const [userDetail, setUserDetail] = useState({role:"noLogin",email:"", data:{}})

  const  setAuth = (role, email, data) => {
    setUserDetail({role:role,email:email, data:data})
    // setEmail(email) ;
    // setRole(role) ;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'contact':
        return <Contact/>;
      default:
        return null;
    }
  };


  useEffect(() => {
    console.log("title")
    document.title = 'מרכז מתנדבים רמת שלמה';
  }, []);



  return (
    <div>
    <div>
      <title>מרכז מתנדבים רמת שלמה</title>
      <link rel="icon" href="../src/images/icon.jpg" />
    </div>
    
    <BrowserRouter>
    <div>
      <img id = "logo" src={Logo} alt="logo" align="center"/>
      <button id="logout" onClick={()=>logout(setAuth)}>יציאה</button>
    </div>
    
      <Routes>
          <Route exact path="/" element={<Layout/>}>
          <Route path="/contact" element={<Contact />} />
          <Route index element={ (userDetail.role==="noLogin")? <Login title = "page" getUserDetail={setAuth}/> : <Navigate replace to={(userDetail.role === "admin")?"manager":"volunteer"}/>} />
          <Route exact path="manager" element={ (userDetail.role==="admin")? <Manager userEmail = {userDetail.email} /> : <Navigate replace to={"/"}/>} />
          <Route exact path="volunteer" element={(userDetail.role==="volunteer")? <Volunteer userEmail = {userDetail.email} userData = {userDetail.data}/> : <Navigate replace to={"/"}/>} />
          <Route path="*" element={<Login title = "*" getUserDetail={setAuth} />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
   
    </div>
  ); 
}

export default App;
