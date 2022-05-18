import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link, useNavigate } from "react-router-dom";
import "../css/state.css";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function FormCities() {
  const [itemsState, setItemsState] = useState([]);
  const navigate = useNavigate();

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
 
  const options = itemsState.map((op) => ({ id: op.idState, label: op.name}) )

  //Post cities
  const [State, setState] = useState("");
  const [Name, setName] = useState("");
  const submit = (e) => {
    console.log(State, Name);
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/city/save", {
      method: "POST",
      body: JSON.stringify({
        idState: State,
        name: Name,
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
          //window.location.reload();
          navigate("/listCities");
        });
      }
    });
  };

  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="offset-5">City</h1>
            <div className="col-md-8 container card shadow-lg bg-white mt-5">
              <form className="row g-3 mt-2 mb-3 ms-3 me-3" id="formul">
                <div className="col-md-12">
                  <div className="offset-5 divD">
                    <label htmlFor="inputEmail4" className="form-label">
                      State
                    </label>
                  </div>
                  <div>
                  <br />
                  <Autocomplete
                    onChange={(event, value) => {
                      setState(value.id);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: "100%" }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                      <TextField {...params} label="Select State" />
                    )}
                  />
                </div>
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
                <div className="col-md-6 mt-5">
                  <Link to="/settings">
                    <button type="button" className="btn text-dark btState">
                      Cancel
                    </button>
                  </Link>
                </div>
                <div className="col-md-6 mt-5">
                  <button
                    type="submit"
                    className="text-dark btn btState"
                    onClick={submit}
                  >
                    Save
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

export default FormCities;
