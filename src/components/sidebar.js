import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "../css/sidebear.css"; 

const Sidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="black" backgroundColor="white">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "black" }}
          >
            Menu
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink  to="/dashboard">
              <CDBSidebarMenuItem style={{color: "black"}} icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/services">
              <CDBSidebarMenuItem style={{color: "black"}} icon="plus">New Service</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/customers">
              <CDBSidebarMenuItem style={{color: "black"}} icon="users">Customers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/inpectors">
              <CDBSidebarMenuItem style={{color: "black"}} icon="user">
                Inpectors
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/settings">
              <CDBSidebarMenuItem style={{color: "black"}} icon="cog">Settings</CDBSidebarMenuItem>
            </NavLink>

            {/*<NavLink  to="/" target="_blank" >
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
  </NavLink>*/}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Inpection
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
