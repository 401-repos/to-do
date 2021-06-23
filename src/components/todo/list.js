import { Badge, Toast } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { PreferencesContext } from "../../contexts/preferences-context";
import { AuthContext } from "../../contexts/authContext";


function TodoList(props) {
  const { user } = useContext(AuthContext);
  const { displayNumber, displayComplete, pageNum, setPageButtons, sortBy } = useContext(PreferencesContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    let items = [...props.list];
    if (!displayComplete) {
      items = items.filter(elem => {
        return !elem.complete
      });
    }
    items.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) < new Date(b.date) ? -1 : 1;
      }
      if (typeof a[sortBy] === 'string') {
        return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1;
      }
      return a[sortBy] < b[sortBy] ? 1 : -1;
    });
    setPageButtons(items.length / displayNumber);

    items = items.slice((displayNumber * (pageNum - 1)), (displayNumber * pageNum));
    setItems(items)
  }, [displayNumber, displayComplete, pageNum, setPageButtons, sortBy, props.list]);


  return (
    <div style={{ width: '400px' }}>
      {items.map((item) => (
        <Toast
          animation
          onClose={() => props.handleDelete(item._id)}
          key={item._id}
        >
          <Toast.Header closeButton={user.capabilities.includes("delete")}
>
            <Badge
              style={{ cursor: 'pointer' }}
              className="mr-auto m-1"
              onClick={() => {user.capabilities.includes("update") && props.handleComplete(item._id)}}
              size="sm"
              pill
              variant={`${item.complete ? 'success' : 'danger'}`}
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
