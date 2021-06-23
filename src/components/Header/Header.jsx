import {
  Row,
  Col,
  Nav,
  Navbar
} from "react-bootstrap";
import React, { useContext } from "react";
import SignupBtn from '../regester/signupForm';
import SigninBtn from "../login/loginForm";
import { AuthContext } from "../../contexts/authContext";
import Auth from '../Auth/Auth';
import Title from "../Title/Title";
import SignoutBtn from "../SignoutBtn/SignoutBtn";

function Header(props) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Row>
      <Col>
        <Navbar bg="success" variant="dark">
          <Navbar.Brand href="#home">To-Do Manager</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Auth condition={!isLoggedIn}>
            <SignupBtn />
            <SigninBtn />
          </Auth>
          <Auth condition={isLoggedIn}>
            <Title /> 
            <SignoutBtn/>
          </Auth>
        </Navbar>
      </Col>
    </Row>
  );
}

export default Header;
