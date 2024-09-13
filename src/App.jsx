// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import "./components/style.css"
import Header from './components/Header'
import Hero from './components/Hero'
import Why from './components/Why'
import Achievment from './components/Achievment'
import Testimonial from './components/Testimonial.jsx'
import Question from './components/Question.jsx'
import Footer from './components/Footer.jsx'
import Foot from './components/Foot.jsx'
import Dashboard from './components/Dashboard.jsx'
import { Routes , Route } from 'react-router-dom';
import Home from './components/Home.jsx';


const App = () => {
  return (
      <>
        <Routes>
            <Route  path='/' element={<Home/>}/>
            <Route  path='/dashboard' element={<Dashboard/>}/>
        </Routes>
        </>
  );
};

export default App;
