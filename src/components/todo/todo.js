import { Navbar, Container, Row, Col } from "react-bootstrap";
import React, {  useEffect } from "react";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import useForm from "../../hooks/useForm.jsx";
import useAjax from "../../hooks/useAjax.jsx";

import "./todo.scss";

function ToDo(props) {
  const [toggleComplete, handleDelete, addItem, list ] = useAjax()
  const [formItem, handleInputChange, handleEdit , setFormItem] = useForm(list);
    

  useEffect(() => {
    const complete = list.filter((item) => item.complete).length;
    const incomplete = list.length - complete;
    document.title = `${complete} complete / ${incomplete} incomplete`;
  });
  return (
    <>
      <Container>
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
          <Col>
            <TodoForm
              handleSubmit={addItem}
              handleInputChange={handleInputChange}
              formItem={formItem}
              setFormItem={setFormItem}
            />
          </Col>

          <Col>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ToDo;
