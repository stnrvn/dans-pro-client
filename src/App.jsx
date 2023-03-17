import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ProtectedRoutes from "./components/PrivateRoute";
  
import {
  Login,
  Home,
  JobDetail
} from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login/>} path='/login' />

        {/* Protected Routes Routes */}
        <Route path='/' element={<ProtectedRoutes/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/job/:id' element={<JobDetail/>}/>
        </Route>
      </Routes>

    </Router>
  );
}

export default App;
