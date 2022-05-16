import { useState, useEffect } from "react";
import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
function ListServices() {
  const [itemsService, setItemsService] = useState([]);
  const [tablaService, setTablaService] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [busquedaBySticker, setBusquedaBySticker] = useState([]);

  //get cities
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/service/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsService(result);
          setTablaService(result);
        },
        (error) => {}
      );
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const handleChangeSticker = (e) => {
    setBusquedaBySticker(e.target.value);
    filtrarSticker(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var results = tablaService.filter((elemento) => {
      if (
        elemento.inspectorName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.customerName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.vehicleTypeName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.vinnumber
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setItemsService(results);
  };

  const filtrarSticker = (terminoBusqueda) => {
    var results = tablaService.filter((elemento) => {
      if (
        elemento.stickerNumber
          ? elemento.stickerNumber
              .toString()
              .toLowerCase()
              .includes(terminoBusqueda.toLowerCase())
          : ""
      ) {
        return elemento;
      }
      //return elemento;
    });
    setItemsService(results);
  };

  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-3">
          <div className="row">
            <h1 className="col-md-10">Services</h1>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  value={busqueda}
                  id="inputSearch"
                  placeholder="Filter by inspector or customer..."
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  value={busquedaBySticker}
                  id="inputSearchSticker"
                  placeholder="Filter by sticker..."
                  onChange={handleChangeSticker}
                />
              </div>
              <div className="col-md-2 mt-2">
                {" "}
                <button
                  style={{ display: "none" }}
                  className="btn btn-outline-success"
                  type="button"
                >
                  Search
                </button>
              </div>
              <div className="col-md-2">
                <Link to="/services">
                  <button type="button" className="btn bt">
                    <span className="icon">
                      <i className="bi bi-plus"></i>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="table-responsive table-wrapper">
            <table className=" table table-striped bg-white">
              <thead className="">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Inpector</th>
                  <th scope="col">Date</th>
                  <th scope="col">Customer</th>
                  <th scope="col">VINNumber</th>
                  <th scope="col">Type</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Year</th>
                  <th scope="col">Model</th>
                  <th scope="col">Drivetrain</th>
                  <th scope="col">Color</th>
                  <th scope="col">Miles</th>
                  <th scope="col">Sticker</th>
                  <th scope="col">InspectionType</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {itemsService.map((item) => (
                  <tr key={item.idService}>
                    <td>{item.idService}</td>
                    <td>{item.inspectorName}</td>
                    <td>{item.registrationDate}</td>
                    <td>{item.customerName}</td>
                    <td>{item.vinnumber}</td>
                    <td>{item.vehicleTypeName}</td>
                    <td>{item.brandName}</td>
                    <td>{item.year}</td>
                    <td>{item.modelName}</td>
                    <td>{item.drivetrainName}</td>
                    <td>{item.colorName}</td>
                    <td>{item.miles}</td>
                    <td>{item.stickerNumber}</td>
                    <td>{item.inspectionTypeName}</td>
                    <td>{item.price}</td>
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

export default ListServices;
