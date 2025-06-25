import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Login = () => {
    const [email , setEmail] = useState('');
    const [pass , setPass] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        /* Dummy Data */
        if(email === 'admin@example.com' && pass === 'password') {
            localStorage.setItem('auth' , 'true');
            navigate('/dashboard');
        }else{
            alert('Invalid Credentials');
        }
        };


        return(
            <div className="d-flex justify-content-center align-items-center  h-100">
            <Card>
                <Card.Header>
                    Login
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleLogin}>
                    <input className='form-control mb-3' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    <input className='form-control mb-3' type="Password" placeholder='Password' onChange={e => setPass(e.target.value)} />
                    <button className = 'btn btn-primary' type="submit">Login</button>
                </form> 
                </Card.Body>
            </Card>
            </div>
        )
    }
    export default Login;