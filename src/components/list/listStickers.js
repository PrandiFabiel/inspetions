import { useState, useEffect } from "react";
import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function ListStickers() {
  const [items, setItems] = useState([]);

  //get cities
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/sticker/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setTablaSticker(result);
        },
        (error) => {}
      );
  }, []);

  //Edit color
  const [Name, setName] = useState("");
  let edited = 0;

  const edit = (e) => {
    console.log(Name);
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/sticker/save", {
      method: "POST",
      body: JSON.stringify({
        idSticker: inputSearch,
        stickerNumber: Name,
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
    fetch("http://devcompuservi.ddns.net:8080/sticker/find?id=" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 400) {
            swal("Empty", "Introduzca el id", "warning");
          }
          let inputName = document.getElementById("inputName");
          inputName.value = result.stickerNumber;
          edited = 1;

          if (edited > 0) {
            setName(result.stickerNumber);
          }
        },
        (error) => {
          swal("Undefined", "not exist", "warning");
        }
      );
  }

  let [inputSearch, setInputSearch] = useState("");

  //filtrar
  const [tablaSticker, setTablaSticker] = useState([]);
  const [busqueda, setBusqueda] = useState([]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var results = tablaSticker.filter((elemento) => {
      if (
        elemento.stickerNumber
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
            <h1 className="col-md-10">Stickers</h1>
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
              <Link to="/sticker">
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
                  <th scope="col">Number</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idSticker}>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idSticker);
                        setInputSearch(item.idSticker);
                      }}
                    >
                      {item.stickerNumber}
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
                Edit Color
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
                      Name
                    </label>
                  </div>
                  <input
                    type="text"
                    className="input1S form-control"
                    onChange={(e) => setName(e.target.value)}
                    id="inputName"
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

export default ListStickers;
