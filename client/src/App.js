import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route, Routes, Navigate} from "react-router-dom"
import DisplaySale from './Components/DisplaySale';
import Browse from './Components/Browse';
import Account from './Components/Account';
import Home from './Components/Home';
import Login from './Components/Login';
import CreateSale from './Components/CreateSale';
import { useState } from 'react';
function App() {
  const [goAfterLogin, setGoAfterLogin] = useState("/browse");
  function doSetGoAfterLogin(e){
    setGoAfterLogin(e)
  }
  const b = (window.location.origin).toString() 
  console.log(b)
  console.log((433).toString())
  return (
    <div style={{width:"100%", height:"500px"}}>
      <BrowserRouter>
          <Routes>
            <Route path="/sale" element = {<CreateSale/>}>
            </Route>
            <Route path="/sale/:id" element={<DisplaySale/>}>
            </Route>
            <Route path="/account" element={<Account/>}>
            </Route>
            <Route path="/home" element={<Home setGoAfterLogin={doSetGoAfterLogin}/>}>
            </Route>
            <Route path="/browse" element={<Browse/>}>
            </Route>
            <Route path="/login" element={<Login afterloginpath={goAfterLogin}/>}>
            </Route>
            <Route path="*" element={<Navigate to="/home"/>}>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
