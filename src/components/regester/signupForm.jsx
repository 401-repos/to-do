import React, { useContext, useState } from 'react';
import { Form, Modal,Button, Col } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';

const SignupForm = (props) => {
    const {signup} = useContext(AuthContext);
    const [registrationInfo, setRegistrationInfo] = useState({});
    const handleInput= (e)=>{
        setRegistrationInfo({...registrationInfo , [e.target.name]:e.target.value});
        // console.log(registrationInfo);
    }
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e)=>{
                        e.preventDefault();
                        console.log(registrationInfo)
                        signup(registrationInfo);
                        // props.onHide();
                    }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="validationCustomUsername">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control required={true} onChange={handleInput} name="username" type="text" placeholder="username" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required={true} onChange={handleInput} name="email" type="email" placeholder="Enter email" />
                            </Form.Group>  </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required={true} onChange={handleInput} name="password" type="password" placeholder="Password" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Role</Form.Label>
                                <Form.Control required={true} as="select" name="role" onChange={handleInput} defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                    <option value="user">User</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
function SignupBtn() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button variant="light" onClick={() => setModalShow(true)}>
                Sign Up
            </Button>
            <SignupForm
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
export default SignupBtn;