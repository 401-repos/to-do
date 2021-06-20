import { ListGroup, Container, Row, Col, Button, Card } from "react-bootstrap";
import React from "react";

function TodoList(props) {
  return (
    <ListGroup>
      {props.list.map((item) => (
        <React.Fragment key={item._id * 100}>
          <Card border="primary">
            <Row>
              <Col sm={8}>
                <ListGroup.Item
                  action
                  onClick={() => props.handleComplete(item._id)}
                  variant={`${item.complete ? "success" : "danger"}`}
                  key={item._id}
                >
                  <Row>
                    <Col>{item.text}</Col>
                  </Row>
                  <Row>
                    <Col>{item.assignee}</Col>
                    <Col>{item.date}</Col>
                  </Row>
                </ListGroup.Item>
              </Col>
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <Button
                        variant="warning"
                        style={{ width: "100%" }}
                        key={item._id * 20}
                        onClick={() => props.handleEdit(item._id)}
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        style={{ width: "100%" }}
                        key={item._id * 40}
                        onClick={() => props.handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Card>
        </React.Fragment>
      ))}
    </ListGroup>
  );
}

export default TodoList;
