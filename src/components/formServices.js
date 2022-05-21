import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link, useNavigate } from "react-router-dom";
import "../css/formServices.css";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
function Form() {
  const [itemsinspector, setItemsinspector] = useState([]);
  const [itemsCustomer, setItemsCustomer] = useState([]);
  const [itemsVType, setItemsVType] = useState([]);
  const [itemsBrand, setItemsBrand] = useState([]);
  const [itemsModel, setItemsModel] = useState([]);
  const [itemsDrive, setItemsDrive] = useState([]);
  const [itemsColor, setItemsColor] = useState([]);
  const [itemsinspectorType, setItemsinspectorType] = useState([]);
  const [itemsSticker, setItemsSticker] = useState([]);
  const web = `http://devcompuservi.ddns.net:8080/`;

  //options to autocomplete
  const optionsInspectors = itemsinspector.map((op) => ({
    id: op.idInspector,
    label: op.firstName + " " + op.lastName,
  }));

  const optionsCustomer = itemsCustomer.map((op) => ({
    id: op.idCustomer,
    businessName: op.businessName,
    label: op.firstName + " " + op.lastName,
  }));

  const optionsVTYpe = itemsVType.map((op) => ({
    id: op.idVehicleType,
    label: op.name,
  }));

  const optionsBrands = itemsBrand.map((op) => ({
    id: op.idBrand,
    label: op.name,
  }));

  const optionsModel = itemsModel.map((op) => ({
    id: op.idModel,
    idBrand: op.idBrand,
    label: op.name,
  }));
  //console.log(optionsModel[0]);
  const optionsDrive = itemsDrive.map((op) => ({
    id: op.idDrivetrain,
    label: op.name,
  }));

  const optionsColor = itemsColor.map((op) => ({
    id: op.idColor,
    label: op.name,
  }));

  const optionsInspectorType = itemsinspectorType.map((op) => ({
    id: op.idInspectionType,
    label: op.name,
  }));

  const optionsSticker = itemsSticker.map((op) => ({
    id: op.idSticker,
    label: op.stickerNumber,
  }));

  const navigate = useNavigate();

  //get inspector
  useEffect(() => {
    fetch(`${web}inspector/list`)
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsinspector(result);
        },
        (error) => {}
      );
  }, []);

  //get customer
  useEffect(() => {
    fetch(`${web}customer/list`)
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
    fetch(`${web}vehicletype/list`)
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
    fetch(`${web}brand/list`)
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
    fetch(`${web}model/list`)
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
    fetch(`${web}drivetrain/list`)
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
    fetch(`${web}color/list`)
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
    fetch(`${web}inspectiontype/list`)
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

  //get sticker
  useEffect(() => {
    fetch(`${web}sticker/listbyavailable`)
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsSticker(result);
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
  const [sticker, setSticker] = useState(0);
  const saveService = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${web}service/save`, {
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
          idSticker: sticker,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const confirm = await resp.json();

      if (confirm === "OK") {
        const message = await swal({
          title: "Save!",
          text: "Save Successfully!",
          icon: "success",
        }).then(() => {
          navigate("/dashboard");
        });
        //message.navigate("/dashboard");
      } else {
        const message = await swal({
          title: "Error",
          text: `Please fill all the fields!  ${confirm}`,
          icon: "error",
        });
      }
    } catch (e) {}
  };

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
      Approved,
      sticker
    );

    console.log(e);
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
        idSticker: sticker,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json();
      console.log(res.ok); //la respuesta da error pero aun asi se guarda...
      swal({
        title: "Guardado!",
        text: "Guardado correctamente!",
        icon: "success",
      }).then(() => {
        navigate("/dashboard");
      });
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
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setInspector(value.id);
                  }}
                  id="inputInspector"
                  options={optionsInspectors}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Inpector" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputEmail4" className="fs-4 form-label">
                Date
              </label>
              <input
                type="date"
                // value={Date.}
                id="inputDate"
                className="form-control ip1 mt-4"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputEmail4" className="fs-4 form-label">
                Customer
              </label>
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setCustomer(value.id);
                  }}
                  id="inputCustomer"
                  options={optionsCustomer}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Customer" />
                  )}
                />
              </div>
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
                type="text"
                className="form-control mt-4"
                id="inputVIN"
                onChange={(e) => setVINNumber(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Type
                </label>
              </div>
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setVType(value.id);
                  }}
                  id="inputVType"
                  options={optionsVTYpe}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Type" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Brand
                </label>
              </div>
              {/*-------- inputBrand ------------*/}
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setBrand(value.id);
                  }}
                  id="inputBrand"
                  options={optionsBrands}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Brand" />
                  )}
                />
              </div>
              {/* ------------------------------------------ */}
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Year
                </label>
              </div>
              <input
                type="text"
                className="form-control mt-4"
                id="inputYear"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Model
                </label>
              </div>
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setModel(value.id);
                  }}
                  id="inputModel"
                  options={optionsModel.filter(
                    (optionsModel) => optionsModel.idBrand === Brand
                  )}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Model" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Drivetrain
                </label>
              </div>
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setDrivetrain(value.id);
                  }}
                  id="inputDrivetrain"
                  options={optionsDrive}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Drivetrain" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Color
                </label>
              </div>
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setColor(value.id);
                  }}
                  id="inputColor"
                  options={optionsColor}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Color" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Miles
                </label>
              </div>
              <input
                type="text"
                className="form-control mt-4"
                id="inputMiles"
                onChange={(e) => setMilles(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Sticker
                </label>
              </div>
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setSticker(value.id);
                  }}
                  id="inputSticker"
                  options={optionsSticker}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Sticker" />
                  )}
                />
              </div>
            </div>
            <h1>Inpector</h1>
            <hr></hr>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Type
                </label>
              </div>
              <div>
                <br />
                <Autocomplete
                  onChange={(event, value) => {
                    setInspectionTypeName(value.id);
                  }}
                  id="inputInspectorType"
                  options={optionsInspectorType}
                  sx={{ width: "100%" }}
                  size={"small"}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Inspection Type" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-1">
                <label htmlFor="inputEmail4" className="form-label">
                  Price
                </label>
              </div>
              <input
                type="text"
                className="form-control mt-4"
                id="inputPrice"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inputServicePaid"
                  onChange={(e) => setServicePaid((e.target.value = 1))}
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
                  id="inputInpectionApproved"
                  onChange={(e) => setApproved((e.target.value = 1))}
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
                onClick={saveService}
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
