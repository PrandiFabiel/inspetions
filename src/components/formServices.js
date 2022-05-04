import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link } from "react-router-dom";
import "../css/formServices.css";
import swal from "sweetalert";
function Form() {
  const [itemsinspector, setItemsinspector] = useState([]);
  const [itemsCustomer, setItemsCustomer] = useState([]);
  const [itemsVType, setItemsVType] = useState([]);
  const [itemsBrand, setItemsBrand] = useState([]);
  const [itemsModel, setItemsModel] = useState([]);
  const [itemsDrive, setItemsDrive] = useState([]);
  const [itemsColor, setItemsColor] = useState([]);
  const [itemsinspectorType, setItemsinspectorType] = useState([]);

  //get inspector
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/inspector/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsinspector(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //get customer
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/customer/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsCustomer(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //get VType
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/vehicletype/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsVType(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

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

  //get model
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/model/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsModel(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //get drivetrain
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/drivetrain/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsDrive(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //get color
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/color/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsColor(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //get inspector type
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/inspectiontype/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsinspectorType(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //Post service
  const [Inspector, setInspector] = useState("");
  const [Date, setDate] = useState("");
  const [Customer, setCustomer] = useState("");
  const [VINNumber, setVINNumber] = useState("");
  const [VType, setVType] = useState("");
  const [Brand, setBrand] = useState("");
  const [Year, setYear] = useState("");
  const [Model, setModel] = useState("");
  const [Drivetrain, setDrivetrain] = useState("");
  const [Color, setColor] = useState("");
  const [Miles, setMilles] = useState("");
  const [InspectionTypeName, setInspectionTypeName] = useState("");
  const [Price, setPrice] = useState("");
  const [ServicePaid, setServicePaid] = useState("");
  const [Approved, setApproved] = useState("");

  const submit = (e) => {
    console.log(
      Inspector,
      Date,
      Customer,
      VINNumber,
      VType,
      Brand,
      Year,
      Model,
      Drivetrain,
      Color,
      Miles,
      InspectionTypeName,
      Price,
      ServicePaid,
      Approved
    );
    e.preventDefault();
    fetch("http://devcompuservi.ddns.net:8080/service/save", {
      method: "POST",
      body: JSON.stringify({
        idBrand: Brand,
        idModel: Model,
        idColor: Color,
        idDrivetrain: Drivetrain,
        idVehicleType: VType,
        year: Year,
        miles: Miles,
        date: Date,
        idInspector: Inspector,
        idInspectionType: InspectionTypeName,
        idCustomer: Customer,
        price: Price,
        servicePaid: ServicePaid,
        inspectionApproved: Approved,
        vinnumber: VINNumber,
        idSticker: 1
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
        swal("Error", "Ha ocurrido un error, intente rellenar los campos.", "error");
      }
    });
  };

  return (
    <div className="App">
      <BarraSuperior />
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        className="row mt-3"
      >
        <div className="col-md-11 container card shadow-lg bg-white mt-5">
          <h1>Services</h1>
          <form className="row g-3 mt-2 mb-3 ms-3 me-3" id="formul">
            <div className="col-md-4">
              <label htmlFor="inputEmail4" className="fs-4 form-label">
                Inpector
              </label>
              <select
                className="form-select ip1"
                defaultValue={"Hola"}
                onChange={(e) => setInspector(e.target.value)}
              >
                <option defaultValue>Select Inpector</option>
                {itemsinspector.map((item) => (
                  <option key={item.idInspector} value={item.idInspector}>
                    {item.firstName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputEmail4" className="fs-4 form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control ip1"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputEmail4" className="fs-4 form-label">
                Customer
              </label>
              <select
                className="form-select ip1"
                onChange={(e) => setCustomer(e.target.value)}
              >
                <option defaultValue>Select Customer</option>
                {itemsCustomer.map((item) => (
                  <option key={item.idCustomer} value={item.idCustomer}>
                    {item.firstName}
                  </option>
                ))}
              </select>
            </div>
            <hr></hr>
            <h1>Vehicle</h1>
            <div className="col-md-6">
              <div className="col-md-2">
                <label htmlFor="inputEmail4" className="form-label">
                  VINNumber
                </label>
              </div>

              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                onChange={(e) => setVINNumber(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Type
                </label>
              </div>
              <select
                className="form-select"
                defaultValue={"Hola"}
                onChange={(e) => setVType(e.target.value)}
              >
                <option defaultValue>Select Type</option>
                {itemsVType.map((item) => (
                  <option key={item.idVehicleType} value={item.idVehicleType}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Brand
                </label>
              </div>
              <select
                className="form-select"
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
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Year
                </label>
              </div>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Model
                </label>
              </div>
              <select
                className="form-select"
                defaultValue={"Hola"}
                onChange={(e) => setModel(e.target.value)}
              >
                <option defaultValue>Select Model</option>
                {itemsModel.map((item) => (
                  <option key={item.idModel} value={item.idModel}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Drivetrain
                </label>
              </div>
              <select
                className="form-select"
                defaultValue={"Hola"}
                onChange={(e) => setDrivetrain(e.target.value)}
              >
                <option defaultValue>Select Drivetrain</option>
                {itemsDrive.map((item) => (
                  <option key={item.idDrivetrain} value={item.idDrivetrain}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Color
                </label>
              </div>
              <select
                className="form-select"
                defaultValue={"Hola"}
                onChange={(e) => setColor(e.target.value)}
              >
                <option defaultValue>Select Color</option>
                {itemsColor.map((item) => (
                  <option key={item.idColor} value={item.idColor}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Miles
                </label>
              </div>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                onChange={(e) => setMilles(e.target.value)}
              />
            </div>
            <h1>Inpector</h1>
            <hr></hr>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Type
                </label>
              </div>
              <select
                className="form-select"
                defaultValue={"Hola"}
                onChange={(e) => setInspectionTypeName(e.target.value)}
              >
                <option defaultValue>Select Inpection Type</option>
                {itemsinspectorType.map((item) => (
                  <option
                    key={item.idInspectionType}
                    value={item.idInspectionType}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Price
                </label>
              </div>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => setServicePaid(e.target.value = 1)}
                />
                <div className="col-md-2">
                  <label htmlFor="inputEmail4" className="form-label">
                    Service Paid
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  onChange={(e) => setApproved(e.target.value = 1)}
                />
                <div className="col-md-4">
                  <label htmlFor="inputEmail4" className="form-label">
                    Inpection Approved
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <Link to="/">
                <button type="button" className="btn text-dark bt1">
                  Cancel
                </button>
              </Link>
            </div>
            <div className="col-md-6">
              <button
                type="submit"
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

export default Form;
