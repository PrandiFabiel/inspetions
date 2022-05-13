import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import "../css/state.css";
function FormModel() {
  const [itemsBrand, setItemsBrand] = useState([]);
  const navigate = useNavigate();
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

  //post models
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");

  const submit = (e) => {
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/model/save", {
      method: "POST",
      body: JSON.stringify({ idBrand: brand, name: model }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json()
        if (res.ok === true) {
          swal({
            title: "Guardado!",
            text: "Guardado correctamente!",
            icon: "success",
          }).then(() => {
            navigate("/listVHModels");
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
            <h1 className="offset-5">Model</h1>
            <div className="col-md-11 container card shadow-lg bg-white mt-5">
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
                    name="model[name]"
                    onChange={(e) => setModel(e.target.value)}
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

export default FormModel;
