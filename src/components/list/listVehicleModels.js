import { useState, useEffect } from "react";
import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
function ListVehicleModels() {

  const [items, setItems] = useState([]);
 
  //get cities
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/model/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {}
      );
  }, []);
  
  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="col-md-10">Vehicles Models</h1>
            <div className="col-md-2">
              <Link to="/Model">
                <button type="button" className="btn bt">
                  <span className="icon">
                    <i className="bi bi-plus"></i>
                  </span>
                </button>
              </Link>
            </div>
          </div>
 
          <div className="table-responsive table-wrapper">
            <table className=" table table-striped bg-white">
              <thead className="">
                <tr>
                <th scope="col" >Brand Name</th>
                  <th scope="col" >Name</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idModel}>
                      <td>{item.brandName}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListVehicleModels;