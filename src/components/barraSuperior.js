import React from "react";
import "../css/barraSuperior.css";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"; 

function BarraSuperior() {

  return (
    <div className="barra-superior">
        <Link to="/"><img className="logo-16" alt="Barra" src={logo}/></Link>
    </div>
  );
}
   
export default BarraSuperior;
