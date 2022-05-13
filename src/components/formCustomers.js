import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link, useNavigate } from "react-router-dom";
import "../css/formServices.css";
import swal from "sweetalert";
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
  let edit = 0;

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
        idCustomer: inputSearch,
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

  function buscar(id) {
    //get inspectors
    fetch("http://devcompuservi.ddns.net:8080/customer/find?id=" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 400) {
            swal("Empty", "Introduzca el id", "warning");
          }

          document.getElementById("inputCusType").value = result.idCustomerType;
          document.getElementById("inputBusName").value = result.businessName;
          document.getElementById("InputFirstName").value = result.firstName;
          document.getElementById("InputLastName").value = result.lastName;
          document.getElementById("InputPhone").value = result.phone;
          document.getElementById("InputAddress").value = result.address;
          document.getElementById("InputCity").value = result.idCity;
          document.getElementById("InputState").value = result.idState;
          document.getElementById("InputEmail").value = result.email;
          document.getElementById("inputZip").value = result.zipCode;
          document.getElementById("InputSalvagePrice").value =
            result.salvagePrice;
          document.getElementById("InputEmissionPrice").value =
            result.emissionPrice;
          edit = result.idCustomer;

          if (edit > 0) {
            setType(result.idCustomerType);
            setBusName(result.businessName);
            setFname(result.firstName);
            setLname(result.lastName);
            setPhone(result.phone);
            setAddress(result.address);
            setCity(result.idCity);
            setEmail(result.email);
            setZipCode(result.zipCode);
            setState(result.idState);
            setSalvagePrice(result.salvagePrice);
            setEmissionPrice(result.emissionPrice);
          }
        },
        (error) => {
          swal("Undefined", "not exist", "warning");
        }
      );
  }

  let [inputSearch, setInputSearch] = useState("");

  return (
    <div className="App">
      <BarraSuperior />
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        className="row mt-3"
      >
        <div className="col-md-11 container card shadow-lg bg-white mt-5">
          <h1>Customer</h1>
          <div className="row">
            <div className="col-md-4 mt-2">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setInputSearch(e.target.value)}
                id="inputSearch"
                placeholder="Introduce el id..."
              />
            </div>
            <div className="col-md-1 mt-2">
              {" "}
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => buscar(inputSearch)}
              >
                Search
              </button>
            </div>
          </div>
          <form className="row g-3 mt-2 mb-3 ms-3 me-3" id="formul">
            <div className="col-md-6">
              <div className="col-md-3">
                <label htmlFor="inputEmail4" className="form-label">
                  Customer Type
                </label>
              </div>
              <select
                id="inputCusType"
                className="form-select input1"
                defaultValue={"Hola"}
                onChange={(e) => setType(e.target.value)}
              >
                <option defaultValue>Select Customer Type</option>
                {itemsCusType.map((item) => (
                  <option key={item.idCustomerType} value={item.idCustomerType}>
                    {item.name}
                  </option>
                ))}
              </select>
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
                className="input1 form-control"
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
                className="input1 form-control"
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
                className="input1 form-control"
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
                className="input1 form-control"
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
                className="input1 form-control"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  City
                </label>
              </div>
              <select
                id="InputCity"
                className="form-select input1"
                defaultValue={"Hola"}
                onChange={(e) => setCity(e.target.value)}
              >
                <option defaultValue>Select City</option>
                {itemsCity.map((item) => (
                  <option key={item.idCity} value={item.idCity}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  State
                </label>
              </div>
              <select
                id="InputState"
                className="input1 form-select"
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
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
              </div>
              <input
                type="text"
                id="InputEmail"
                className="input1 form-control"
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
                className="input1 form-control"
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
                className="input1 form-control"
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
                className="input1 form-control"
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
