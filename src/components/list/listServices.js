import { useState, useEffect } from "react";
import BarraSuperior from "../barraSuperior";
import { Link } from "react-router-dom";
function ListServices() {

  const [itemsService, setItemsService] = useState([]);
 
  //get cities
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/service/list")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemsService(result);
        },
        (error) => {}
      );
  }, []);
  
  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="col-md-10">Services</h1>
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
 
          <div className="table-responsive table-wrapper">
            <table className=" table table-striped bg-white">
              <thead className="">
                <tr>
                  <th scope="col" >Inpector</th>
                  <th scope="col" >Date</th>
                  <th scope="col" >Customer</th>
                  <th scope="col" >VINNumber</th>
                  <th scope="col" >Type</th>
                  <th scope="col" >Brand</th>
                  <th scope="col" >Year</th>
                  <th scope="col" >Model</th>
                  <th scope="col" >Drivetrain</th>
                  <th scope="col" >Color</th>
                  <th scope="col" >Miles</th>
                  <th scope="col" >Sticker</th>
                  <th scope="col" >Type</th>
                  <th scope="col" >Price</th>
                </tr>
              </thead>
              <tbody>
                {itemsService.map((item) => (
                  <tr key={item.idService}>
                    <td>{item.inspectorName}</td>
                    <td>{item.registrationDate}</td>
                    <td>{item.customerName}</td>
                    <td>{item.vinnumber}</td>
                    <td>{item.vehicleTypeName}</td>
                    <td>{item.brandName}</td>
                    <td>{item.year}</td>
                    <td>{item.modelName}</td>
                    <td>{item.drivetrainName}</td>
                    <td>{item.colorName}</td>
                    <td>{item.miles}</td>
                    <td>{item.stickerNumber}</td>
                    <td>{item.inspectionTypeName}</td>
                    <td>{item.price}</td>
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

export default ListServices;