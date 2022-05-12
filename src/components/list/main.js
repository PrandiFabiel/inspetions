import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
import "../../css/list.css";

function Settings() {
  return (
    <div className="">
      <BarraSuperior />
      <div
        style={{ height: "100vh",}}
        className="row mt-3"
      > 
        <div className="col-md-11 container mt-5">
          <h1>List of: </h1>
          <div className="row div1">
            <div className="col-md-4 mt-4">
              <Link to="/listCities">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                  Cities
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listCusType">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                  Customer Type
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/ListState">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                  States
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listInsType">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                  Inspection Type
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listBrands">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                  Brands
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listDrivetrains">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                Drivetrain
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listVHModels">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                Vehicle Models
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listVHTypes">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                Vehicle Types
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listColors">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                Colors
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listStickers">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                Stickers
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/listServices">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                Services
                </button>
              </Link>
            </div>
            <div className="col-md-4 mt-4">
              <Link to="/customers">
                <button type="button" className="btn bg-primary shadow-lg text-white bt1L">
                Customers
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