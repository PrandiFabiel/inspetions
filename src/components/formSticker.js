import { useState } from "react";
import swal from "sweetalert";
import BarraSuperior from "./barraSuperior";
import { Link, useNavigate } from "react-router-dom";
import "../css/state.css";
const FormSticker = () => {
  const [sticker, setSticker] = useState("");
  const navigate = useNavigate(); 

  const submit = (e) => {
    console.log(sticker);
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/sticker/save", {
      method: "POST",
      body: JSON.stringify({ stickerNumber: sticker }),
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
            navigate("/listStickers");
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
            <h1 className="offset-5">Sticker</h1>
            <div className="col-md-11 container card shadow-lg bg-white mt-5">
              <form className="row g-3 mt-2 mb-3 ms-3 me-3">
                <div className="col-md-12">
                  <div className="offset-5 divD">
                    <label htmlFor="inputEmail4" className="form-label">
                    Sticker Number
                    </label>
                  </div>
                  <input
                    type="text"
                    className="input1S form-control"
                    onChange={(e) => setSticker(e.target.value)}
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

export default FormSticker;