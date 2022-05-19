import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link } from "react-router-dom";
import "../css/customers.css";
import swal from "sweetalert";
function Customers() {
  const [itemsCustomer, setItemsCustomer] = useState([]);
  const [tablaCustomer, setTablaCustomer] = useState([]);
  const [busqueda, setBusqueda] = useState([]);

  //get customer
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/customer/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsCustomer(result);
          setTablaCustomer(result);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {}
      );
  }, []);

  //get items to selects
  const [itemsCity, setItemsCity] = useState([]);
  const [itemsState, setItemsState] = useState([]);
  const [itemsCusType, setItemsCusType] = useState([]);

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

  //edit customers
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
  let edited = 0;

  const edit = (e) => {
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
          window.location.reload();
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
          edited = result.idCustomer;

          if (edited > 0) {
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

  //Filtral
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var results = tablaCustomer.filter((elemento) => {
      if (
        elemento.firstName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.lastName
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setItemsCustomer(results);
  };

  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="col-md-10">Customers</h1>
          </div>
          <div className="row">
            <div className="col-md-4 mt-2">
              <input
                type="text"
                className="form-control"
                value={busqueda}
                id="inputSearch"
                placeholder="Search by Name or LastName..."
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
              <Link to="/FormCustomers">
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
                  <th scope="col">Name</th>
                  <th scope="col" className="tn">
                    LastName
                  </th>
                  <th scope="col" className="ta">
                    Type
                  </th>
                  <th scope="col">SalvagePrice</th>
                  <th scope="col">BusinessName</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">State</th>
                  <th scope="col">City</th>
                  <th scope="col">Email</th>
                  <th scope="col">ZipCode</th>
                  <th scope="col">EmissionPrice</th>
                </tr>
              </thead>
              <tbody>
                {itemsCustomer.map((item) => (
                  <tr key={item.idCustomer}>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.firstName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.lastName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.customerTypeName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.salvagePrice}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.businessName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.phone}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.address}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.stateName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.cityName}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.email}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.zipCode}
                    </td>
                    <td
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      onClick={() => {
                        buscar(item.idCustomer);
                        setInputSearch(item.idCustomer);
                      }}
                    >
                      {item.emissionPrice}
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
                Edit Customer
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
                      <option
                        key={item.idCustomerType}
                        value={item.idCustomerType}
                      >
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

export default Customers;
