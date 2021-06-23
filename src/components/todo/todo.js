import { Form, Button, ButtonGroup } from "react-bootstrap";

import { Navbar, Container, Row, Col } from "react-bootstrap";
import React, { useContext, useEffect } from "react";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import useForm from "../../hooks/useForm.jsx";
import useAjax from "../../hooks/useAjax.jsx";

import "./todo.scss";
import { PreferencesContext } from "../../contexts/preferences-context.jsx";
import { AuthContext } from "../../contexts/authContext.jsx";
import Auth from '../Auth/Auth.jsx'


function ToDo(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [toggleComplete, handleDelete, addItem, list] = useAjax()
  const [formItem, handleInputChange, handleEdit, setFormItem] = useForm(list);
  const { setPageNum, pageButtons, setSortBy, displayComplete, setDisplayComplete } = useContext(PreferencesContext)
  let listOFButtons = [];
  for (let i = 0; i < pageButtons; i++) {
    listOFButtons.push(<Button variant="secondary" key={i} onClick={(e) => { setPageNum(e.target.innerText) }}>{i + 1}</Button>)
  }
  let souldFormRedner = false;
  if (user.capabilities) {
    console.log(user.capabilities);
    souldFormRedner = user.capabilities.includes("update") ? true : null;
  }
  useEffect(() => {
    if(isLoggedIn){
      const complete = list.filter((item) => item.complete).length;
      const incomplete = list.length - complete;
      document.title = `${complete} complete / ${incomplete} incomplete`;
    }else{
      document.title = "Log in"
    }
  },[isLoggedIn, list]);
  console.log(souldFormRedner);
  return (
    <>
      <Container>
        <Auth condition={isLoggedIn} >
          <Row>
            <Col>
              <Navbar variant="dark" bg="dark" expand="lg">
                <Navbar.Brand>
                  There are {list.filter((item) => !item.complete).length} Items
                  To Complete
                </Navbar.Brand>
              </Navbar>
            </Col>
          </Row>
          <Row className="todo">
            <Auth condition={souldFormRedner}>

              <Col>
                <TodoForm
                  handleSubmit={addItem}
                  handleInputChange={handleInputChange}
                  formItem={formItem}
                  setFormItem={setFormItem}
                />
              </Col>
            </Auth>

            <Col>
              <TodoList
                list={list}
                handleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col>
              <ButtonGroup className="me-2" aria-label="First group">
                {listOFButtons}
              </ButtonGroup>
            </Col>
            <Col>
              <Button size="sm" variant={displayComplete ? "dark" : "info"} onClick={() => { setDisplayComplete(!displayComplete) }}>{displayComplete ? "Hide Complete Tasks" : "Show Complete Tasks"}</Button></Col>
            <Col>
              <Form.Label> {"Sort By:"}
                <select onChange={e => setSortBy(e.target.value)}>
                  <option value="difficulty">{"Difficulty"}</option>
                  <option value="date">{"Date"}</option>
                  <option value="assignee">{"Assignee"}</option>
                </select>
              </Form.Label>
            </Col>
          </Row>
        </Auth>
      </Container>
    </>
  );
}

export default ToDo;
