import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link } from "react-router-dom";
import "../css/inpectors.css";
import swal from "sweetalert";
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
          setTablaInspector(result);
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

  //Edit inspector
  const [itemsCity, setItemsCity] = useState([]);
  const [itemsState, setItemsState] = useState([]);

  //get ciudades
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/city/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsCity(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //get estados
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/state/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsState(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //edit inspector
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Email, setEmail] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [Comiss, setComiss] = useState("");
  const [InspectorID, setInspectorID] = useState("");
  let edited = 0;

  const edit = (e) => {
    console.log(
      Fname,
      Lname,
      InspectorID,
      Phone,
      Address,
      City,
      State,
      Email,
      ZipCode,
      Comiss
    );
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/inspector/save", {
      method: "POST",
      body: JSON.stringify({
        idInspector: inputSearch,
        firstName: Fname,
        lastName: Lname,
        inspectorId: InspectorID,
        phone: Phone,
        address: Address,
        idCity: City,
        idState: State,
        email: Email,
        zipCode: ZipCode,
        commission: Comiss,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json();
      console.log(res.ok);
      if (res.ok === true) {
        swal({
          title: "Guardado!",
          text: "Guardado correctamente!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  function buscar(id) {
    //get inspectors
    fetch("http://devcompuservi.ddns.net:8080/inspector/find?id=" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 400) {
            swal("Empty", "Introduzca el id", "warning");
          }

          let inputFisrtName = document.getElementById("InputFirstName");
          let inputLastName = document.getElementById("InputLastName");
          let inputInspectorID = document.getElementById("InputInspectorID");
          let inputPhone = document.getElementById("InputPhone");
          let inputAddress = document.getElementById("InputAddress");
          let inputCity = document.getElementById("InputCity");
          let inputState = document.getElementById("InputState");
          let inputEmail = document.getElementById("InputEmail");
          let inputZip = document.getElementById("inputZip");
          let inputCommission = document.getElementById("InputCommission");

          inputFisrtName.value = result.firstName;
          inputLastName.value = result.lastName;
          inputInspectorID.value = result.inspectorId;
          inputPhone.value = result.phone;
          inputAddress.value = result.address;
          inputCity.value = result.idCity;
          inputEmail.value = result.email;
          inputZip.value = result.zipCode;
          inputCommission.value = result.commission;
          inputState.value = result.idState;
          edited = result.idInspector;

          if (edited > 0) {
            setFname(result.firstName);
            setLname(result.lastName);
            setPhone(result.phone);
            setInspectorID(result.inspectorId);
            setAddress(result.address);
            setCity(result.idCity);
            setEmail(result.email);
            setZipCode(result.zipCode);
            setComiss(result.commission);
            setState(result.idState);
          }
        },
        (error) => {
          swal("Undefined", "not exist", "warning");
        }
      );
  }

  //filtrar
  const [tablaIsnpector, setTablaInspector] = useState([]);
  const [busqueda, setBusqueda] = useState([]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var results = tablaIsnpector.filter((elemento) => {
      if (
        elemento.firstName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.lastName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setItemsinspector(results);
  };

  let [inputSearch, setInputSearch] = useState("");

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
            </div>
            <div className="row">
              <div className="col-md-4 mt-2">
                <input
                  type="text"
                  className="form-control"
                  value={busqueda}
                  id="inputSearch"
                  placeholder="Search by name or lastName..."
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
                    <th className="col" scope="col">
                      LastName
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
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.firstName}
                      </td>
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.lastName}
                      </td>
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.phone}
                      </td>
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.address}
                      </td>
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.stateName}
                      </td>
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.cityName}
                      </td>
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.zipCode}
                      </td>
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.email}
                      </td>
                      <td
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        onClick={() => {
                          buscar(item.idInspector);
                          setInputSearch(item.idInspector);
                        }}
                      >
                        {item.commission}
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
                  Edit Inspector
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="row g-3 mt-2 mb-3 ms-3 me-3" id="formul">
                  <div className="col-md-6">
                    <div className="col-md-3">
                      <label htmlFor="inputEmail4" className="form-label">
                        First Name
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input1 form-control"
                      id="InputFirstName"
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-3">
                      <label htmlFor="inputEmail4" className="form-label">
                        Last Name
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input1 form-control"
                      id="InputLastName"
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-3">
                      <label htmlFor="inputEmail4" className="form-label">
                        Inspector ID
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input1 form-control"
                      onChange={(e) => setInspectorID(e.target.value)}
                      id="InputInspectorID"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-1">
                      <label htmlFor="inputEmail4" className="form-label">
                        Phone
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input1 form-control"
                      onChange={(e) => setPhone(e.target.value)}
                      id="InputPhone"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-1">
                      <label htmlFor="inputEmail4" className="form-label">
                        Address
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input1 form-control"
                      onChange={(e) => setAddress(e.target.value)}
                      id="InputAddress"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-1">
                      <label htmlFor="inputEmail4" className="form-label">
                        City
                      </label>
                    </div>
                    <select
                      id="InputCity"
                      className="form-select input1"
                      defaultValue={"Hola"}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option defaultValue>Select City</option>
                      {itemsCity.map((item) => (
                        <option key={item.idCity} value={item.idCity}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-1">
                      <label htmlFor="inputEmail4" className="form-label">
                        State
                      </label>
                    </div>
                    <select
                      id="InputState"
                      className="input1 form-select"
                      defaultValue={"Hola"}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option defaultValue>Select State</option>
                      {itemsState.map((item) => (
                        <option key={item.idState} value={item.idState}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-1">
                      <label htmlFor="inputEmail4" className="form-label">
                        Email
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input1 form-control"
                      id="InputEmail"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-1">
                      <label htmlFor="inputEmail4" className="form-label">
                        ZipCode
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input1 form-control"
                      id="inputZip"
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-3">
                      <label htmlFor="inputEmail4" className="form-label">
                        commission
                      </label>
                    </div>
                    <input
                      type="text"
                      className="input1 form-control"
                      id="InputCommission"
                      onChange={(e) => setComiss(e.target.value)}
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
}

export default Inpectors;
