import React, { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import app from "../firebase"


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      const userId = app.auth().currentUser.uid;
      //const LoginDate = new Date();
      const db = app.firestore()
      db.collection("user").doc(userId).set({
        loginDate: new Date(),
        email: emailRef.current.value
      });
      console.log(userId)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="wrapper">
        
          <h2 className="text-center mt-4 name">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className = "p-3 mt-3" onSubmit={handleSubmit}>
          <Form.Group id="email">
          <Form.Label>Email</Form.Label>
            <div className="form-field d-flex align-items-center">
            
              
              <Form.Control type="email" ref={emailRef} required />
              </div>
            </Form.Group>
            
            <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <div className="form-field d-flex align-items-center">
              
              <Form.Control type="password" ref={passwordRef} required />
              </div>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          
        
        <div className="w-100 text-center mt-2 mb-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      </div>
      
    </>
  )
}
