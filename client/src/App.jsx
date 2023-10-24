// import React from "react"; in new version of react we donot need this to import ..lol

import Hero from "./components/Hero";
// import Demo from "./components/Demo";
// importing all the styles 
import PDFs from "./components/Pdfs";
import './App.css';

const App = () => {
  return (
    <main>
        <div className="main">
            <div className="gradient"/>
        </div>


        <div className="app">
            {/* Creating componets */}
            <Hero />
            <PDFs />
            {/* <Demo /> */}
        </div>
    </main>
  )
}

export default App

