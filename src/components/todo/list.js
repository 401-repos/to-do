import { Badge, Toast } from "react-bootstrap";
import React from "react";

function TodoList(props) {
  return (
    <div style={{ width: '400px' }}>
      {props.list.map((item) => (
        <Toast
          animation
          onClose={() => props.handleDelete(item._id)}
          key={item._id}
        >
          <Toast.Header>
            <Badge
              style={{ cursor: 'pointer' }}
              className="mr-auto m-1"
              onClick={() => props.handleComplete(item._id)}
              size="sm"
              pill
              variant={`${item.complete ? 'danger' : 'success'}`}
            >{`${item.complete ? 'completed' : 'pending'}`}</Badge>
            <strong className="mr-auto ml-2">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body style={{ cursor: "pointer" }} onMouseOver={(e) => {
            e.stopPropagation(true)
            e.target.style.backgroundColor = "orange"
          }} onMouseOut={(e) => e.target.style.backgroundColor = "transparent"} onClick={() => props.handleEdit(item._id)}>
            <p>{item.text}</p>
            <small>difficulty: {item.difficulty}</small>
            <small>Date: {item.date.slice(0, 10)}</small>
          </Toast.Body>
        </Toast>
      ))}
    </div>
  );
}

export default TodoList;
