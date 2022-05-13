import { useState } from "react";
import swal from "sweetalert";
import BarraSuperior from "./barraSuperior";
import { Link, useNavigate } from "react-router-dom";
import "../css/state.css";
const FormColor = () => {
  const [colors, setColors] = useState(" ");
  const navigate = useNavigate();

  const submit = (e) => {
    console.log(colors);
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/color/save", {
      method: "POST",
      body: JSON.stringify({
        idColor:inputSearch,
        name: colors,
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
          navigate("/listColors");
        });
      }
    });
  };

  
  function say(id) {
    //get colors
    fetch("http://devcompuservi.ddns.net:8080/color/find?id=" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 400) {
            swal("Empty", "Introduzca el id", "warning");
          }
          console.log(result);
          let input = document.getElementById("colorInput");
          input.value = result.name;
        },
        (error) => {
          swal("Undefined", "not exist", "warning");
        }
      );
  }

  const [inputSearch, setInputSearch] = useState("");

  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="offset-5">Color</h1>
            <div className="col-md-11 container card shadow-lg bg-white mt-5">
              <div className="row">
                <div className="col-md-6 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setInputSearch(e.target.value)}
                    id="inputSearch"
                    placeholder="Search..."
                  />
                </div>
                <div className="col-md-6 mt-2">
                  {" "}
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    onClick={() => say(inputSearch)}
                  >
                    Search
                  </button>
                </div>
              </div>
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
                    onChange={(e) => setColors(e.target.value)}
                    id="colorInput"
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
};

export default FormColor;
