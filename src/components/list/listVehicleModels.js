import { useState, useEffect } from "react";
import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function ListVehicleModels() {
  const [items, setItems] = useState([]);
  const [itemsBrand, setItemsBrand] = useState([]);

  //get brand
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/brand/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsBrand(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //get model
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/model/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setTablaModel(result);
        },
        (error) => {}
      );
  }, []);

  //Edit vehicleModels
  const [Name, setName] = useState("");
  const [brand, setBrand] = useState("");
  let edited = 0;

  const edit = (e) => {
    console.log(Name);
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/model/save", {
      method: "POST",
      body: JSON.stringify({
        idModel: inputSearch,
        idBrand: brand,
        name: Name,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json();
      console.log(res.ok);
      if (res.ok === true) {
        swal({
          title: "Edited!",
          text: "Successfully Edited!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  function buscar(id) {
    fetch("http://devcompuservi.ddns.net:8080/model/find?id=" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 400) {
            swal("Empty", "Introduzca el id", "warning");
          }
          let inputName = document.getElementById("inputName");
          let inputBrand = document.getElementById("inputBrand");
          inputName.value = result.name;
          inputBrand.value = result.idBrand;
          edited = 1;

          if (edited > 0) {
            setName(result.name);
            setBrand(result.idBrand);
          }
        },
        (error) => {
          swal("Undefined", "not exist", "warning");
        }
      );
  }

  let [inputSearch, setInputSearch] = useState("");

  //filtrar
  const [tablaModel, setTablaModel] = useState([]);
  const [busqueda, setBusqueda] = useState([]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var results = tablaModel.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.brandName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setItems(results);
  };

  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="col-md-10">Vehicles Models</h1>
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
              <button
                style={{ display: "none" }}
                className="btn btn-outline-success"
                type="button"
              >
                Search
              </button>
            </div>
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
                  <th scope="col">Brand Name</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idModel}>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idModel);
                        setInputSearch(item.idModel);
                      }}
                    >
                      {item.brandName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idModel);
                        setInputSearch(item.idModel);
                      }}
                    >
                      {item.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Brand
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3 mt-2 mb-3 ms-3 me-3">
                <div className="col-md-12">
                  <div className="offset-5 divD">
                    <label htmlFor="inputEmail4" className="form-label">
                      Brand
                    </label>
                  </div>
                  <select
                    className="input1S form-select"
                    defaultValue={"Hola"}
                    id="inputBrand"
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option defaultValue>Select Brand</option>
                    {itemsBrand.map((item) => (
                      <option key={item.idBrand} value={item.idBrand}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-12">
                  <div className="offset-5 divD">
                    <label htmlFor="inputEmail4" className="form-label">
                      Name
                    </label>
                  </div>
                  <input
                    type="text"
                    className="input1S form-control"
                    id="inputName"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={edit}
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListVehicleModels;
