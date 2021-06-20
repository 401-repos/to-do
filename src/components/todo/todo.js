import { Navbar, Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import TodoForm from "./form.js";
import TodoList from "./list.js";

import "./todo.scss";

function ToDo(props) {
  const [list, setList] = useState([]);
  const [formItem, setFormItem] = useState({});

  const addItem = (item) => {
    let myList = list;
    if (item.editFlag) {
      item.editFlag = false;
      let found = myList.findIndex((elem) => (elem._id = item._id));
      myList.splice(found, 1);
    }
    item._id = Math.random();
    item.complete = false;
    setFormItem({ assignee: "", text: "", difficulty: "" });
    setList([...list, item]);
  };
  const handleInputChange = (e) => {
    const prevItem = formItem;
    setFormItem({ ...prevItem, [e.target.name]: e.target.value });
  };
  const handleDelete = (_id) => {
    const newList = list.filter((elem) => _id !== elem._id);
    setList(newList);
  };
  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setList(newList);
    }
  };
  const handleEdit = (id) => {
    const item = list.filter((elem) => {
      return elem._id === id;
    });
    item[0].editFlag = true;
    setFormItem(item[0]);
  };
  useEffect(() => {
    let myList = [
      {
        _id: 1,
        complete: false,
        text: "Clean the Kitchen",
        difficulty: 3,
        assignee: "Person A"
      },
      {
        _id: 2,
        complete: false,
        text: "Do the Laundry",
        difficulty: 2,
        assignee: "Person A"
      },
      {
        _id: 3,
        complete: false,
        text: "Walk the Dog",
        difficulty: 4,
        assignee: "Person B"
      },
      {
        _id: 4,
        complete: true,
        text: "Do Homework",
        difficulty: 3,
        assignee: "Person C"
      },
      {
        _id: 5,
        complete: false,
        text: "Take a Nap",
        difficulty: 1,
        assignee: "Person B"
      }
    ];

    setList(myList);
  }, []);
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
