import { useState } from "react";
import swal from "sweetalert";
import BarraSuperior from "./barraSuperior";
import { Link, useNavigate } from "react-router-dom";
import "../css/sticker.css";
import DataAccess from "./DataAccess";
const FormSticker = () => {
  const [sticker, setSticker] = useState("");
  const [initial, setInitial] = useState("");
  const [number, setnumber] = useState();
  const [sequence, setsequence] = useState();
  const navigate = useNavigate();

  //const input = document.getElementById('#txtSticker');

  const saveSticker = async (e) => {
    e.preventDefault();
    console.log(initial + number + sequence);

    const resp = await fetch(`${DataAccess}sticker/stickergenerator`, {
      method: "POST",
      body: JSON.stringify({
        initial: initial,
        number: number,
        sequence: sequence,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("llego");
    const confirm = await resp.json();
    console.log(confirm);
    if (confirm === "OK") {
      const message = await swal({
        title: "Save!",
        text: "Save Successfully!",
        icon: "success",
      }).then(() => {
        navigate("/settings");
      });
      //setSticker('');
      //message.navigate("/Sticker");
    } else {
      const message = await swal({
        title: "Error",
        text: `Please fill all the fields! \n ${confirm}`,
        icon: "error",
      });
      //setSticker('');
      // message.navigate("/Sticker");
    }
  };

  const submit = (e) => {
    console.log(sticker);
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/sticker/save", {
      method: "POST",
      body: JSON.stringify({ stickerNumber: sticker }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json();
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
            <h1 className="offset-5">Sticker Generator</h1>
            <div className="col-md-11 container card shadow-lg bg-white mt-5">
              <form className="row g-3 mt-2 mb-3 ms-3 me-3">
                <div className="col-md-12">
                  <div className="offset-5 divD">
                    <label htmlFor="inputEmail4" className="form-label1">
                      Sticker Number
                    </label>
                  </div>
                </div>

                <div className="textfields">
                  {/* //textfield1 */}
                  <div className="col-md-2">
                    <label htmlFor="inputEmail4" className="form-label">
                      Initial
                    </label>

                    <input
                      type="text"
                      className="form-control mt-4"
                      id="initial"
                      onChange={(e) => setInitial(e.target.value)}
                    />
                  </div>

                  {/* end Textfield1 */}

                  {/* //textfield1 */}
                  <div className="col-md-2">
                    <label htmlFor="inputEmail4" className="form-label">
                      Number
                    </label>
                    <input
                      type="text"
                      className="form-control mt-4"
                      id="initial"
                      onChange={(e) => setnumber(e.target.value)}
                    />
                  </div>

                  {/* end Textfield1 */}

                  {/* //textfield1 */}
                  <div className="col-md-2">
                    <label htmlFor="inputEmail4" className="form-label">
                      Sequence
                    </label>
                    <input
                      type="text"
                      className="form-control mt-4"
                      id="initial"
                      onChange={(e) => setsequence(e.target.value)}
                    />
                  </div>

                  {/* end Textfield1 */}
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
                    onClick={saveSticker}
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
