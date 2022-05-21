import { useState, useEffect, useRef } from "react";
import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DataAccess from "../DataAccess";
import "../../css/listServices.css";
function ListServices() {
  const [itemsService, setItemsService] = useState([]);
  const [tablaService, setTablaService] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [busquedaBySticker, setBusquedaBySticker] = useState([]);
  const [busquedaDate, setBusquedaDate] = useState([]);

  //referencias
  const inspectorRef = useRef();

  //get services
  useEffect(() => {
    fetch(`${DataAccess}service/list`)
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsService(result);
          setTablaService(result);
          let SumComission = 0;
          let SumPrices = 0;

          result.map((element) => {
            SumComission = element.commission + SumComission;
            SumPrices = element.price + SumPrices;
          });
          console.log(SumComission);
          console.log(SumPrices);
          settotalComission(SumComission);
          settotalPrice(SumPrices);
        },
        (error) => {}
      );
  }, []);

  //filter
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    filterByDate();
  };

  const handleChangeDate = (e) => {
    setBusquedaDate(e.target.value);
    filterByDate(e.target.value);
  };

  const handleChangeSticker = (e) => {
    setBusquedaBySticker(e.target.value);
    filtrarSticker(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var results = tablaService.filter((elemento) => {
      if (
        elemento.inspectorName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.customerName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.vehicleTypeName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.vinnumber
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setItemsService(results);
  };

  const filtrarSticker = (terminoBusqueda) => {
    var results = tablaService.filter((elemento) => {
      if (
        elemento.stickerNumber
          ? elemento.stickerNumber
              .toString()
              .toLowerCase()
              .includes(terminoBusqueda.toLowerCase())
          : ""
      ) {
        return elemento;
      }
      //return elemento;
    });
    setItemsService(results);
  };

  const filterByDate = (terminoBusqueda) => {
    var results = tablaService.filter((e) => {
      if (
        e.date
          ? e.date
              .toString()
              .toLowerCase()
              .includes(terminoBusqueda.toLowerCase())
          : ""
      ) {
        return e;
      }
    });
    setItemsService(results);
  };

  //edit services
  let [inputSearch, setInputSearch] = useState("");
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
  let edited = 0;

  const edit = (e) => {
    console.log(ServicePaid, Approved);
    e.preventDefault();
    fetch(`${DataAccess}service/save`, {
      method: "POST",
      body: JSON.stringify({
        idService: inputSearch,
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
      console.log(res.ok);
      swal({
        title: "Edited!",
        text: "Successfully Edited!",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    });
  };

  const options = ["Option 1", "Option 2"];

  function buscar(id) {
    //get inspectors
    fetch(`${DataAccess}service/find?id= ${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 400) {
            swal("Empty", "Introduzca el id", "warning");
          }

          setValue(result.inspectorName);
          //document.getElementById("inputDate").value = result.date;
          document.getElementById("inputCustomer").value = result.idCustomer;
          document.getElementById("inputVIN").value = result.vinnumber;
          document.getElementById("inputVType").value = result.idVehicleType;
          document.getElementById("inputBrand").value = result.idBrand;
          document.getElementById("inputYear").value = result.year;
          document.getElementById("inputModel").value = result.idModel;
          document.getElementById("inputDrivetrain").value =
            result.idDrivetrain;
          document.getElementById("inputColor").value = result.idColor;
          document.getElementById("inputMiles").value = result.miles;
          document.getElementById("inputSticker").value = result.idSticker;
          document.getElementById("inputInspectorType").value =
            result.idInspectionType;
          document.getElementById("inputPrice").value = result.price;
          document.getElementById("inputServicePaid").value =
            result.servicePaid;
          document.getElementById("inputInpectionApproved").value =
            result.inspectionApproved;
          edited = result.idService;

          if (edited > 0) {
            console.log("entro");
            setInspector(result.idInspector);
            setDate(result.date);
            setCustomer(result.idCustomer);
            setVINNumber(result.vinnumber);
            setVType(result.idVehicleType);
            setBrand(result.idBrand);
            setYear(result.year);
            setModel(result.idModel);
            setDrivetrain(result.idDrivetrain);
            setColor(result.idColor);
            setMilles(result.miles);
            setSticker(result.idSticker);
            setInspectionTypeName(result.idInspectionType);
            setPrice(result.price);
            setServicePaid(result.ServicePaid);
            setApproved(result.inspectionApproved);
          }
        },
        (error) => {
          swal("Undefined", "not exist", "warning");
        }
      );
  }

  //gettings
  const [itemsinspector, setItemsinspector] = useState([]);
  const [itemsCustomer, setItemsCustomer] = useState([]);
  const [itemsVType, setItemsVType] = useState([]);
  const [itemsBrand, setItemsBrand] = useState([]);
  const [itemsModel, setItemsModel] = useState([]);
  const [itemsDrive, setItemsDrive] = useState([]);
  const [itemsColor, setItemsColor] = useState([]);
  const [itemsinspectorType, setItemsinspectorType] = useState([]);
  const [itemsSticker, setItemsSticker] = useState([]);
  const [totalComission, settotalComission] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);

  //get inspector
  useEffect(() => {
    fetch(`${DataAccess}inspector/list`)
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
    fetch(`${DataAccess}customer/list`)
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
    fetch(`${DataAccess}vehicletype/list`)
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
    fetch(`${DataAccess}brand/list`)
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
    fetch(`${DataAccess}model/list`)
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
    fetch(`${DataAccess}drivetrain/list`)
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
    fetch(`${DataAccess}color/list`)
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
    fetch(`${DataAccess}inspectiontype/list`)
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
    fetch(`${DataAccess}sticker/list`)
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

  //options to autocomplete
  const optionsInspectors = itemsinspector.map((op) => ({
    id: op.idInspector,
    label: op.firstName + " " + op.lastName,
  }));

  const [value, setValue] = useState(options[0]);

  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-3">
          <div className="row">
            <h1 className="col-md-10">Services</h1>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  value={busqueda}
                  id="inputSearch"
                  placeholder="Filter by inspector or customer..."
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={busquedaBySticker}
                  id="inputSearchSticker"
                  placeholder="Filter by sticker..."
                  onChange={handleChangeSticker}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={busquedaDate}
                  id="inputSearch"
                  onChange={handleChangeDate}
                />
              </div>
              <div className="col-md-2 mt-2">
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
                <Link to="/services">
                  <button type="button" className="btn bt">
                    <span className="icon">
                      <i className="bi bi-plus"></i>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="table-responsive table-wrapperService">
            <table className=" table table-striped bg-white">
              <thead className="">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Inpector</th>
                  <th scope="col">Date</th>
                  <th scope="col">Customer</th>
                  <th scope="col">VINNumber</th>
                  <th scope="col">Type</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Year</th>
                  <th scope="col">Model</th>
                  <th scope="col">Drivetrain</th>
                  <th scope="col">Color</th>
                  <th scope="col">Miles</th>
                  <th scope="col">Sticker</th>
                  <th scope="col">InspectionType</th>
                  <th scope="col">Price</th>
                  <th scope="col">Commission</th>
                </tr>
              </thead>
              <tbody>
                {itemsService.map((item) => (
                  <tr key={item.idService}>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.idService}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.inspectorName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.registrationDate}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.customerName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.vinnumber}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.vehicleTypeName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.brandName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.year}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.modelName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.drivetrainName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.colorName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.miles}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.stickerNumber}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.inspectionTypeName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.price}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idService);
                        setInputSearch(item.idService);
                      }}
                    >
                      {item.commission}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-md-8 fw-bold fs-5">{`Total commissions: $${totalComission}`}</div>
            <div className="col-md-4 fw-bold fs-5">{`Total Prices: $${totalPrice}`}</div>
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
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Service
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
                <div className="col-md-4">
                  <label htmlFor="inputEmail4" className="fs-4 form-label">
                    Inpector
                  </label>
                  <div>
                    <Autocomplete
                      onChange={(event, value) => {
                        setInspector(value.id);
                      }}
                      //id="inputInspector"
                      ref={inspectorRef}
                      value={value}
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
                    id="inputDate"
                    className="form-control ip1"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputEmail4" className="fs-4 form-label">
                    Customer
                  </label>
                  <select
                    id="inputCustomer"
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
                    type="text"
                    className="form-control"
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
                  <select
                    id="inputVType"
                    className="form-select"
                    defaultValue={"Hola"}
                    onChange={(e) => setVType(e.target.value)}
                  >
                    <option defaultValue>Select Type</option>
                    {itemsVType.map((item) => (
                      <option
                        key={item.idVehicleType}
                        value={item.idVehicleType}
                      >
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
                    id="inputBrand"
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
                  <select
                    className="form-select"
                    defaultValue={"Hola"}
                    id="inputModel"
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
                    id="inputDrivetrain"
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
                    id="inputColor"
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
                  <select
                    className="form-select"
                    defaultValue={"Hola"}
                    id="inputSticker"
                    onChange={(e) => setSticker(e.target.value)}
                  >
                    <option defaultValue>Select Sticker</option>
                    {itemsSticker.map((item) => (
                      <option key={item.idSticker} value={item.idSticker}>
                        {item.stickerNumber}
                      </option>
                    ))}
                  </select>
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
                    id="inputInspectorType"
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

export default ListServices;
