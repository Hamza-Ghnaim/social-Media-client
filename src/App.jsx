import './App.css'; 
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Post from './Pages/Post';
import registration from './Pages/Registration';
import Login from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import PassChange from "./Pages/PassChange";
import PageNotFound from './Pages/PageNotFound';
import { authContext } from './helpers/authContext';
import { useState,useEffect } from 'react';
import axios from "axios";

function App() {

  const[authState,setAuthState]=useState({
    username:"",
    id:0,
    status:false
  });
  
  useEffect(()=>{
    axios.get("http://localhost:3001/auth/checkToken",{headers:{
      accessToken:localStorage.getItem("accessToken")
    }}).then((response)=>{
      if (response.data.error) {
        setAuthState({...authState,status:false})
      }else{setAuthState({
        username:response.data.username,
        id:response.data.id,
        status:true
      });}
    })

  },[]);

  const logout=()=>{
    localStorage.removeItem("accessToken");
    setAuthState({
      username:"",
      id:0,
      status:false
    });
  };

  return (
    <div className='App'>
      <authContext.Provider value={{authState,setAuthState}}>
        <Router >
        <div className="navbar">
          <div className='Links'>
            {!authState.status ? (  
              <>
                <Link to="login">Login</Link>
                <Link to="registration">Register</Link>
              </>
              ):(
                <>
                  <Link to="/">HomePage</Link>
                  <Link to="/createpost">Create A Post</Link>
                </>
              )
            }
          </div>
          <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
        </div>
          <Routes>
            <Route path='/' exact Component={Home}/>
            <Route path='/createpost' exact Component={CreatePost} />
            <Route path='/post/:id' exact Component={Post} />
            <Route path='/registration' exact Component={registration} />
            <Route path='/login' exact Component={Login} />
            <Route path='/profile/:id' exact Component={ProfilePage} />
            <Route path="/passwordchange" exact Component={PassChange} />
            <Route path='*' exact Component={PageNotFound}/>
            
          </Routes>
        </Router>
      </authContext.Provider>
    </div>
  );
}

export default App;
