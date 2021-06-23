import React, { useContext } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';

const Title = (props) => {
    const { user } = useContext(AuthContext)
    console.log(user);
    // useEffect(()=>{
    //     fetching();
    // },[isLoggedIn,fetching])
    return (

        <Container>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                {`Signed in as:`}  <a href="#login">{user.type.toUpperCase()}</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Container>
    );
}

export default Title;