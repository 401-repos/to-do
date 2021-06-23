import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';

const SignoutBtn = (props) => {
    const {logOut} = useContext(AuthContext)
    return ( 
        
        <Button onClick={logOut} variant="outline-danger">Sign Out</Button>
     );
}
 
export default SignoutBtn;