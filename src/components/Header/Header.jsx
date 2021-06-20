import {
  Row,
  Col,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import React from "react";

function Header(props) {
  return (
    <Row>
      <Col>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">To-Do Manager</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
      </Col>
    </Row>
  );
}

export default Header;
