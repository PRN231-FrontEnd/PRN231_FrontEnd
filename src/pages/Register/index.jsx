import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://flowerexchange.azurewebsites.net/api/account/register",
        {
          email: email,
          password: password,
          fullname: fullname,
          phoneNumber: phoneNumber,
        }
      );
      console.log("Register successful:", response.data);
      setSuccessMessage("Registration successful! Please log in.");
      // Optionally, you can redirect to the login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Registration failed! Please check your details.");
    }
  };

  return (
    <>
      <section className="vh-100">
        <Container className="py-5 h-100">
          <Row className="d-flex align-items-center justify-content-center h-100">
            <Col md={8} lg={7} xl={6}>
              <Image
                src="https://png.pngtree.com/png-vector/20220829/ourmid/pngtree-ic22827-vector-pink-and-blue-flower-floral-decoration-with-gold-wedding-png-image_6129036.png"
                fluid
                alt="Phone image"
              />
            </Col>
            <Col md={7} lg={5} xl={5} className="offset-xl-1">
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              <Form onSubmit={handleRegister}>
                {/* Fullname Input */}
                <Form.Group className="form-outline mb-4">
                  <Form.Control
                    type="text"
                    id="form3Fullname"
                    className="form-control-lg"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Form.Group>

                {/* Email Input */}
                <Form.Group className="form-outline mb-4">
                  <Form.Control
                    type="email"
                    id="form1Email"
                    className="form-control-lg"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                {/* Password Input */}
                <Form.Group className="form-outline mb-4">
                  <Form.Control
                    type="password"
                    id="form2Password"
                    className="form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {/* Phone Number Input */}
                <Form.Group className="form-outline mb-4">
                  <Form.Control
                    type="text"
                    id="form4Phone"
                    className="form-control-lg"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <a href="/login">Already got an account ?</a>
                <br />
                <Button type="submit" className="btn-lg btn-success">
                  Sign up
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
