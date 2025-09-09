// import React, { useState } from 'react'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { Form, Container, Button } from 'react-bootstrap';
// import { authentication } from '../../configureFirebase/config'
// import { useNavigate } from 'react-router'
// import './Login.css'

// export const Login = () => {
//   const navigate = useNavigate()
//   const [login, setlogin] = useState({ email: "", password: "", role: "" })

//   const handleloginSubmit = async (e) => {
//     e.preventDefault()
//     const { email, password, role } = login
//     try {
//       const loggedinuser = await signInWithEmailAndPassword(authentication, email, password)
//       alert("Login successful!")

//       if (role === "Admin") {
//         localStorage.setItem("loggedInAdmin", JSON.stringify(loggedinuser))
//       } else {
//         localStorage.setItem("loggedInUser", JSON.stringify(loggedinuser))
//       }
//       navigate(`/${role}Dashboard`)
//     } catch (err) {
//       alert("Login failed. Please check your credentials.")
//     }
//   }

//   return (
//     <Container className='d-flex justify-content-center align-items-center min-vh-100 bg-light'>
//       <Form onSubmit={handleloginSubmit} className='p-4 rounded shadow bg-white w-100' style={{ maxWidth: '400px' }}>
//         <h3 className='text-center mb-4'>Login</h3>

//         <Form.Group className='mb-3'>
//           <Form.Label>Email:</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter email'
//             onChange={(e) => setlogin({ ...login, email: e.target.value })}
//             required
//           />
//         </Form.Group>

//         <Form.Group className='mb-3'>
//           <Form.Label>Password:</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Enter password'
//             onChange={(e) => setlogin({ ...login, password: e.target.value })}
//             required
//           />
//         </Form.Group>

//         <Form.Group className='mb-4'>
//           <Form.Select
//             onChange={(e) => setlogin({ ...login, role: e.target.value })}
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="Admin">Admin</option>
//             <option value="User">User</option>
//           </Form.Select>
//         </Form.Group>

//         <Button variant="primary" type='submit' className='w-100'>
//           Login
//         </Button>
//       </Form>
//     </Container>
//   )
// }


import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Container, Button } from 'react-bootstrap';
import { authentication } from '../../configureFirebase/config';
import { useNavigate } from 'react-router';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = login;
    
    if (!email || !password || !role) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const loggedInUser = await signInWithEmailAndPassword(authentication, email, password);
      
      if (role === "Admin") {
        localStorage.setItem("loggedInAdmin", JSON.stringify(loggedInUser));
      } else {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      }
      navigate(`/${role}Dashboard`);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="login-container" style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"100px"}}>
      <Form onSubmit={handleLoginSubmit} className="login-form">
        <h3 className="login-title">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <Form.Group className="mb-3 form-group">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            required
            className="form-input"
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            required
            className="form-input"
          />
        </Form.Group>

        <Form.Group className="mb-4 form-group">
          <Form.Select
            onChange={(e) => setLogin({ ...login, role: e.target.value })}
            required
            className="form-select"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Select>
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </Container>
  );
};