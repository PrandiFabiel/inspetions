import { Link } from "react-router-dom";

import add from "../img/add.png";
import c1 from "../img/c1.png";
import clienteTarget from "../img/clienteTarget.png";
import lista from "../img/lista.png";
import employee from "../img/employee.png";
import setting from "../img/setting.png"; 
import "../css/principal.css";


function principal() {
  return (
      <div className="principal screen">
      <div className="menu-principal">Menu Principal</div>
        <div className="buttons">
          <div className="overlap-group-container-2">
            <div className="overlap-group-19">
              <img className="add-5" src={add} alt="img1" />
              <Link to="/services">
                <img className="x-button" src={c1} alt="img2" />
              </Link>
            </div>
            <div className="overlap-group-20">
              <img className="target-3" alt="Img3" src={clienteTarget} />
              <Link to="/customers">
                <img className="x-button" src={c1} alt="img4" />
              </Link>
            </div>
          </div>
          <div className="overlap-group-container-3">
            <div className="overlap-group-19">
              <img className="list" alt="img5" src={lista} />
              <Link to="/dashboard">
                <img className="x-button" src={c1} alt="img2" />
              </Link>
            </div>
            <div className="overlap-group-20">
              <img className="employee-3" alt="img6" src={employee} />
              <Link to="/inpectors">
                <img className="x-button" src={c1} alt="img7" />
              </Link>
            </div>
          </div>
          <div className="setting-container">
            <img className="setting-3" alt="img8" src={setting} />
            <Link to="/settings">
              <img
                className="x-button"
                src={c1} alt="img10"
              />
            </Link>
          </div>
        </div>
      </div>
  );
}

export default principal;
