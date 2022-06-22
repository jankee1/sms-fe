import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HeaderComponent } from './components/layouts/HeaderComponent'; 
import { FooterComponent } from './components/layouts/FooterComponent'; 
import {MainBodyComponent} from './components/MainBodyComponent/MainBodyComponent'

export const App = () => {
  return (
    <div className="App">
      <HeaderComponent/>
      <MainBodyComponent/>
      <FooterComponent/>
    </div>
  );
}


