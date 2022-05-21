import { useState } from "react";
import swal from "sweetalert";
import BarraSuperior from "./barraSuperior";
import { Link, useNavigate } from "react-router-dom";
import "../css/state.css";
import  DataAccess  from "./DataAccess";
const FormSticker = () => {
  const [sticker, setSticker] = useState("");
  const navigate = useNavigate(); 
  
  //const input = document.getElementById('#txtSticker');
  

  const saveSticker = async (e) =>{
    e.preventDefault();
    const resp = await fetch(`${DataAccess}sticker/save`, {
      method: "POST",
      body: JSON.stringify({ 
        stickerNumber: sticker 
      }),
      headers: { "Content-Type": "application/json" },
    })
    const confirm = await resp.json();

    if(confirm == 'OK'){
      const message = await swal({
        title: "Save!",
        text: "Save Successfully!",
        icon: "success",
        
      });
      setSticker('');
      //message.navigate("/Sticker");
      
    }
    else{
      const message = await swal({
        title: "Error",
        text: `Please fill all the fields! \n ${confirm}`,
        icon: "error",
      });
      setSticker('');
     // message.navigate("/Sticker");
  
    }

    
  }

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
                    className="input1S form-control "
                    id = "txtSticker"
                    value = {sticker}
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