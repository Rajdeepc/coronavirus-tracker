import React from "react";
import { Navbar ,Nav,Form,FormControl,Button} from "react-bootstrap";

export default function ReactNavbar({lastUpdatedTime}) {
  return (
    <Navbar bg="light"  sticky="top">
      <Navbar.Brand href="#home">COVID-19 World Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home"></Nav.Link>
          <Nav.Link href="#link"></Nav.Link>
        </Nav>
        <Navbar.Text>
          Last Updated: <span>{lastUpdatedTime}</span>
        </Navbar.Text>
        
      </Navbar.Collapse>
    </Navbar>
  );
}
