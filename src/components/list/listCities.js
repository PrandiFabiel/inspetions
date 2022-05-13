import { useState, useEffect } from "react";
import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
function ListCities() {
  const [itemsCities, setItemsCities] = useState([]);
  const [tablaCities, setTablaCities] = useState([]);
  const [busqueda, setBusqueda] = useState([]);

  //get cities
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/city/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsCities(result);
          setTablaCities(result);
        },
        (error) => {}
      );
  }, []);
 
  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value); 
  }

  const filtrar = (terminoBusqueda) =>{
    var results = tablaCities.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
      elemento.stateName.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){

        return elemento;
      }
    });
    setItemsCities(results); 
  }

  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-4">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="col-md-10">Cities</h1>
          </div>
          <div className="row">
            <div className="col-md-4 mt-2">
              <input
                type="text"
                className="form-control"
                value={busqueda}
                id="inputSearch"
                placeholder="Search..."
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mt-2">
              {" "}
              <button style={{display: "none"}} className="btn btn-outline-success" type="button">
                Search
              </button>
            </div>
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
                  <th scope="col">State</th>
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
