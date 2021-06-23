import React, { useContext, useState } from 'react';
import { Form, Modal,Button, Col } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';
const SigninForm = (props) => {
    const {signIn} = useContext(AuthContext);
    const [loginInfo, setLoginInfo] = useState({username:"", password:""});
    
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
                        Sign In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e=>{
                        e.preventDefault();
                            console.log(loginInfo)
                        signIn(loginInfo.username, loginInfo.password)
                        props.onHide();
                    }}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control onChange={e=>setLoginInfo({...loginInfo, username:e.target.value})} value={loginInfo.username} required={true} placeholder="username" type="text" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={e=> setLoginInfo({...loginInfo, password:e.target.value})} value={loginInfo.password} required={true} type="password" placeholder="Password" />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    );
}

 function SigninBtn() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="dark" onClick={() => setModalShow(true)}>
                Sign In
            </Button>

            <SigninForm
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default SigninBtn;