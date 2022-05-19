import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link, useNavigate } from "react-router-dom";
import "../css/formServices.css";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
function FormCustomers() {
  const [itemsCity, setItemsCity] = useState([]);
  const [itemsState, setItemsState] = useState([]);
  const [itemsCusType, setItemsCusType] = useState([]);
  const navigate = useNavigate();

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

  //get customer type
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/customertype/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsCusType(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //post customers
  const [type, setType] = useState("");
  const [BusName, setBusName] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Email, setEmail] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [SalvagePrice, setSalvagePrice] = useState("");
  const [EmissionPrice, setEmissionPrice] = useState("");

  const submit = (e) => {
    console.log(
      type,
      BusName,
      Fname,
      Lname,
      Phone,
      Address,
      City,
      State,
      Email,
      ZipCode,
      SalvagePrice,
      EmissionPrice
    );
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/customer/save", {
      method: "POST",
      body: JSON.stringify({
        idCustomerType: type,
        businessName: BusName,
        firstName: Fname,
        lastName: Lname,
        phone: Phone,
        address: Address,
        idCity: City,
        idState: State,
        email: Email,
        zipCode: ZipCode,
        salvagePrice: SalvagePrice,
        emissionPrice: EmissionPrice,
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
          navigate("/customers");
        });
      }
    });
  };

  //Options to autocomplete
  const optionsCusType = itemsCusType.map((op) => ({
    id: op.idCustomerType,
    label: op.name,
  }));
  const optionsState = itemsState.map((op) => ({
    id: op.idState,
    label: op.name,
  }));
  const optionsCity = itemsCity.map((op) => ({
    id: op.idCity,
    label: op.name,
  }));

  return (
    <div className="App">
      <BarraSuperior />
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        className="row mt-3"
      >
        <div className="col-md-11 container card shadow-lg bg-white mt-5">
          <h1>Customer</h1>
          <form className="row g-3 mt-2 mb-3 ms-3 me-3" id="formul">
            <div className="col-md-6">
              <div className="col-md-3">
                <label htmlFor="inputEmail4" className="form-label">
                  Customer Type
                </label>
              </div>
              <div>
                <Autocomplete
                  onChange={(event, value) => {
                    setType(value.id);
                  }}
                  id="inputCusType"
                  options={optionsCusType}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Customer Type" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-3">
                <label htmlFor="inputEmail4" className="form-label">
                  Business Name
                </label>
              </div>
              <input
                type="text"
                id="inputBusName"
                className="form-control"
                onChange={(e) => setBusName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-3">
                <label htmlFor="inputEmail4" className="form-label">
                  First Name
                </label>
              </div>
              <input
                type="text"
                id="InputFirstName"
                className="  form-control"
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
                id="InputLastName"
                className="  form-control"
                onChange={(e) => setLname(e.target.value)}
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
                id="InputPhone"
                className="  form-control"
                onChange={(e) => setPhone(e.target.value)}
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
                id="InputAddress"
                className="  form-control"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  City
                </label>
              </div>
              <div>
                <Autocomplete
                  onChange={(event, value) => {
                    setCity(value.id);
                  }}
                  id="inputCity"
                  options={optionsCity}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select City" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  State
                </label>
              </div>
              <div>
                <Autocomplete
                  onChange={(event, value) => {
                    setState(value.id);
                  }}
                  id="inputState"
                  options={optionsState}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select State" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
              </div>
              <input
                type="text"
                id="InputEmail"
                className="  form-control"
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
                className="  form-control"
                id="inputZip"
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-3">
                <label htmlFor="inputEmail4" className="form-label">
                  Salvage Price
                </label>
              </div>
              <input
                type="text"
                id="InputSalvagePrice"
                className="  form-control"
                onChange={(e) => setSalvagePrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-3">
                <label htmlFor="inputEmail4" className="form-label">
                  Emission Price
                </label>
              </div>
              <input
                type="text"
                id="InputEmissionPrice"
                className="  form-control"
                onChange={(e) => setEmissionPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6 mt-5">
              <Link to="/customers">
                <button type="button" className="btn text-dark bt1">
                  Cancel
                </button>
              </Link>
            </div>
            <div className="col-md-6 mt-5">
              <button
                type="button"
                className="text-dark btn bt1"
                onClick={submit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormCustomers;
