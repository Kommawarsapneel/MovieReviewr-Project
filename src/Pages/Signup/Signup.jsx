import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import './Signup.css';
import { authentication, db } from '../../configureFirebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();
  const [signup, setsignup] = useState({
    name: "", email: "", password: "", role: ""
  });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const accountCreated = await createUserWithEmailAndPassword(authentication, signup.email, signup.password);
      console.log("Signup successful", accountCreated);

      await updateProfile(accountCreated.user, {
        displayName: signup.name
      });

      await setDoc(doc(db, `${signup.role}s`, signup.name), {
        name: signup.name,
        email: signup.email,
        role: signup.role,
        id: Date.now()
      });

      alert("Account created successfully. Redirecting to login...");
      navigate("/Login");
    } catch (err) {
      console.error("Signup error:", err.message);
      alert("Error: " + err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Form onSubmit={handleSignupSubmit} className="p-4 shadow rounded bg-white w-100" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Sign Up</h3>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            required
            onChange={(e) => setsignup({ ...signup, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setsignup({ ...signup, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setsignup({ ...signup, password: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Select
            required
            onChange={(e) => setsignup({ ...signup, role: e.target.value })}
          >
            <option value="">Select the Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Signup
        </Button>
      </Form>
    </Container>
  );
};
