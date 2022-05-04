import { useState, useEffect } from "react";
import BarraSuperior from "./barraSuperior";
import { Link } from "react-router-dom";
import "../css/customers.css";
function Customers() {

  const [itemsCustomer, setItemsCustomer] = useState([]);
 
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
  
  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="col-md-10">Customers</h1>
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
                  <th scope="col" >Name</th>
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
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.customerTypeName}</td>
                    <td>{item.salvagePrice}</td>
                    <td>{item.businessName}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.stateName}</td>
                    <td>{item.cityName}</td>
                    <td>{item.email}</td>
                    <td>{item.zipCode}</td>
                    <td>{item.emissionPrice}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;