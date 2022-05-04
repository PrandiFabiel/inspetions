
import BarraSuperior from "./barraSuperior";
import "../css/dash.css";
function dashboard() {
  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="col-md-10">Dashboard</h1>

          </div>
        </div>
      </div>
    </div>
  );
}

export default dashboard;
