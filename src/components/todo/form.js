import { Form, Button } from "react-bootstrap";
import React from "react";

function TodoForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let addedItem = props.formItem;
    addedItem.difficulty = parseInt(e.target.difficulty.value);
    console.log(addedItem);
    props.handleSubmit(addedItem, props.setFormItem);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h3>Add Item</h3>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>To Do Item</Form.Label>
          <Form.Control
            name="text"
            type="text"
            required={true}

            placeholder="Add To Do List Item"
            onChange={props.handleInputChange}
            value={props.formItem.text}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            required={true}
            name="date"
            type="date"
            placeholder="Due Date"
            onChange={props.handleInputChange}
            value={props.formItem.date}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            name="assignee"
            required={true}

            placeholder="Assigned To"
            onChange={props.handleInputChange}
            value={props.formItem.assignee}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRange">
          <Form.Label>Difficulty Rating</Form.Label>
          <Form.Control
            type="range"
            min="1"
            max="5"
            name="difficulty"
            onChange={props.handleInputChange}
            value={props.formItem.difficulty}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </>
  );
}

export default TodoForm;
