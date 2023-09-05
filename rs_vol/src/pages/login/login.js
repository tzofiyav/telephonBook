import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import './login.css'
import backgroundImg from "./background.jpg" ;
import {logInWithEmailAndPassword} from "../../firebase_db"
import { useHistory } from 'react-router-dom';


function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const setRole = props.setRole ;
  var setUserDetail = props.getUserDetail ;

  // const setEmail = props.setEmail ;


  const handleLogin = (e) =>{
    e.preventDefault();
    logInWithEmailAndPassword(username, password, setUserDetail)
  }

  return(
    
<div style={{backgroundImage: `url(${backgroundImg})`, backgroundColor: "rgba(0,0,0,0.5)", width: "100%",
  height: "577px",
  float: "left",
  backgroundSize: "cover",
  backgroundPosition: "right",
  backgroundBlendMode: "overlay",
  position: "inherit",
  zIndex : 2,
  backgroundRepeat: "no-repeat"}}>

  <h1 style={{color: "#40E080", fontSize: '45px'}}>מרכז מתנדבים רמת שלמה</h1>

  <h2 style={{color: "#40E080", fontSize: '35px'}}  id="slogen">
  .פשוט לתת את הנשמה. נקודה
  </h2>
  
  <form onSubmit={handleLogin}>
    <label><h3>כניסה לאיזור האישי </h3></label>
    <div style={{marginBottom: "5px"}} className= "inputLogin">
      <label for="username">שם משתמש</label>
      <input  style={{}} type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
    </div> 
    <div style={{marginBottom: "0px"}} className= "inputLogin">
      <label for="password">סיסמה</label>
      <input style={{width: "93%"}} type="password"  id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
    </div>  
    <button type = "submit" id="login" style={{width: "50%", borderRadius: "25px"}} >כניסה</button>
    </form>
    </div>
  );
}

export default Login; 


 
  // function handleLogin(event){
  //   var user = document.getElementById("username").value;
  //   var pass = document.getElementById("password").value;

  //   // logInWithEmailAndPassword(event.username,)
  //   alert(pass);
  //   // Navigate("manager");
  //   // Navigate("./manager");
  //   // if(event.target.value==="manager"){
  
  //   //   Navigate("/manager");
  //   // }
  //   // else{
  //   //   Navigate("/volunteer");
  //   // }
  // }
  // function handleSignup(event){

  //   alert(event.target.value);
  //   // Navigate("manager");
  //   // Navigate("/manager");
  //   // if(event.target.value==="manager"){
  
  //   //   Navigate("/manager");
  //   // }
  //   // else{
  //   //   Navigate("/volunteer");
  //   // }
  // }