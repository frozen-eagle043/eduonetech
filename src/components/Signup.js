import React, { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)

      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="wrapper">
        <div class="logo"> <img src="https://sm.ign.com/ign_in/feature/k/kang-the-c/kang-the-conqueror-explained-who-is-the-rumored-villain-of-a_p7uu.jpg" alt=""/> </div>
          <h2 className="text-center mt-4 name">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
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
            <Form.Group className="ml-2" id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <div className="form-field d-flex align-items-center">
              <Form.Control type="password" ref={passwordConfirmRef} required />
              </div>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        <div className="w-100 text-center mt-2 mb-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
      
    </>
  )
}
