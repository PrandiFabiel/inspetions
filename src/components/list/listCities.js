import { useState, useEffect } from "react";
import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
function ListCities() {

  const [itemsCities, setItemsCities] = useState([]);
 
  //get cities
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/city/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsCities(result);
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
            <h1 className="col-md-10">Cities</h1>
            <div className="col-md-2">
              <Link to="/cities">
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
                  <th scope="col" >State</th>
                  <th scope="col" className="tn">
                    City
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemsCities.map((item) => (
                  <tr key={item.idCity}>
                    <td>{item.stateName}</td>
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

export default ListCities;