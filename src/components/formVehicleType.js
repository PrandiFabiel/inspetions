import { useState } from "react";
import swal from "sweetalert";
import BarraSuperior from "./barraSuperior";
import { Link } from "react-router-dom";
import "../css/state.css";
function FormVehicleType() {
  //Post vehicles types
  const [Name, setName] = useState("");
  //const [isLoaded, setIsLoaded] = useState(true);

  const submit = (e) => {
    console.log(Name);
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/vehicletype/save", {
      method: "POST",
      body: JSON.stringify({
        name: Name,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json();
      console.log(res.ok);
      if (res.ok === true) {
        swal("Guardado", "Guardado correctamente!", "success");
        let formulario = document.getElementById("formul");
        formulario.reset();
      } else {
        swal(
          "Error",
          "Ha ocurrido un error, intente rellenar los campos.",
          "error"
        );
      }
    });
  };
  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="offset-4">Vehicle Type</h1>
            <div className="col-md-11 container card shadow-lg bg-white mt-5">
              <form className="row g-3 mt-2 mb-3 ms-3 me-3" id="formul">
                <div className="col-md-12">
                  <div className="offset-5 divD">
                    <label htmlFor="inputEmail4" className="form-label">
                      Name
                    </label>
                  </div>
                  <input
                    type="text"
                    className="input1S form-control"
                    id="inputAddress"
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

export default FormVehicleType;
