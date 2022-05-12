import BarraSuperior from "./barraSuperior";
import { Link } from "react-router-dom";
import "../css/settings.css";
function Settings() {
  return (
    <div className="">
      <BarraSuperior />
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        className="row mt-3"
      > 
        <div className="col-md-11 container mt-5">
          <h1>Settings</h1>
          <div className="row div1">
            <h1 className="offset-4 mb-3">General</h1>
            <div className="col-md-6 mt-4">
              <Link to="/cities">
                <button type="button" className="btn text-dark bt1S">
                  Cities
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-4">
              <Link to="/custoType">
                <button type="button" className="btn text-dark bt1S">
                  Customer Type
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-4">
              <Link to="/state">
                <button type="button" className="btn text-dark bt1S">
                  States
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-4">
              <Link to="/inpectType">
                <button type="button" className="btn text-dark bt1S">
                  Inspection Type
                </button>
              </Link>
            </div>
            <h1 className="offset-4 mt-5">Vehicles</h1>
            <div className="col-md-6 mt-4">
              <Link to="/brand">
                <button type="button" className="btn text-dark bt1S">
                  Brands
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-4">
              <Link to="/drivetrain">
                <button type="button" className="btn text-dark bt1S">
                Drivetrain
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-4">
              <Link to="/Model">
                <button type="button" className="btn text-dark bt1S">
                Vehicle Models
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-4">
              <Link to="/vehicleType">
                <button type="button" className="btn text-dark bt1S">
                Vehicle Types
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-4">
              <Link to="/color">
                <button type="button" className="btn text-dark bt1S">
                Colors
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-4">
              <Link to="/sticker">
                <button type="button" className="btn text-dark bt1S">
                Stickers
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
