import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link } from "react-router-dom";
import "../css/inpectors.css";
function Inpectors() {
  const [itemsinspector, setItemsinspector] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
 
  //get inspector
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/inspector/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItemsinspector(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="">Loading information...</div>;
  } else {
    return (
      <div className="divFa">
        <BarraSuperior />
        <div style={{ height: "100vh" }} className="container row mt-5">
          <div className="col-md-11 container mt-5">
            <div className="row">
              <h1 className="col-md-10">Inpectors</h1>
              <div className="col-md-2">
                <Link to="/formInpectors">
                  <button type="button" className="btn bt">
                    <span className="icon">
                      <i className="bi bi-plus"></i>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
  
            <div className="table-responsive table-wrapper">
              <table className="table table-striped bg-white">
                <thead className="">
                  <tr>
                    <th className="col-md-1" scope="col">
                      Name
                    </th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">State</th>
                    <th scope="col">City</th>
                    <th scope="col">ZipCode</th>
                    <th scope="col">Email</th>
                    <th scope="col">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsinspector.map((item) => (
                    <tr key={item.idInspector}>
                      <td>{item.firstName}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.stateName}</td>
                      <td>{item.cityName}</td>
                      <td>{item.zipCode}</td>
                      <td>{item.email}</td>
                      <td>{item.commission}</td>
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

}

export default Inpectors;
