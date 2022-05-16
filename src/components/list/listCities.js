import { useState, useEffect } from "react";
import BarraSuperior from "../barraSuperior";
import swal from "sweetalert";
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

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var results = tablaCities.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.stateName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setItemsCities(results);
  };

  const [itemsState, setItemsState] = useState([]);
  //const navigate = useNavigate();

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

  //Edit cities
  const [State, setState] = useState("");
  const [Name, setName] = useState("");
  let StateEdit = 0;

  const edit = (e) => {
    console.log(State, Name);
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/city/save", {
      method: "POST",
      body: JSON.stringify({
        idCity: inputSearch,
        idState: State,
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
          //navigate("/dashboard");
        });
      }
    });
  };

  function buscar(id) {
    //get cities
    fetch("http://devcompuservi.ddns.net:8080/city/find?id=" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 400) {
            swal("Empty", "Introduzca el id", "warning");
          }
          console.log(result);
          let inputState = document.getElementById("stateInput");
          let inputName = document.getElementById("nameInput");
          inputState.value = result.idState;
          inputName.value = result.name;
          StateEdit = result.idState;

          if (StateEdit > 0) {
            setState(StateEdit);
            setName(result.name);
          }
        },
        (error) => {
          swal("Undefined", "not exist", "warning");
        }
      );
  }

  let [inputSearch, setInputSearch] = useState("");

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
              <button
                style={{ display: "none" }}
                className="btn btn-outline-success"
                type="button"
              >
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
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCity);
                        setInputSearch(item.idCity);
                      }}
                    >
                      {item.stateName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCity);
                        setInputSearch(item.idCity);
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
                Edit City
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
                <div className="col-md-12">
                  <div className="offset-5 divD">
                    <label htmlFor="inputEmail4" className="form-label">
                      State
                    </label>
                  </div>
                  <select
                    id="stateInput"
                    className="input1S form-select"
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
                <div className="col-md-12">
                  <div className="offset-5 divD">
                    <label htmlFor="inputEmail4" className="form-label">
                      Name
                    </label>
                  </div>
                  <input
                    type="text"
                    className="input1S form-control"
                    id="nameInput"
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

export default ListCities;