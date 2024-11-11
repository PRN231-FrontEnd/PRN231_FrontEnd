import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Thêm state cho thông báo lỗi
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setIsLoading(true); // Bắt đầu loading
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://flowerexchange.azurewebsites.net/api/account/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("Login successful:", response.data);
      const accessToken = response.data.accessToken;
      if (accessToken && typeof accessToken === "string") {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        const decodedUser = jwtDecode(accessToken);
        localStorage.setItem("decodedUser", JSON.stringify(decodedUser));

        console.log(decodedUser);

        navigate("/"); // Điều hướng sau khi đăng nhập thành công
      } else {
        throw new Error("Invalid token");
      }

      navigate("/"); // Điều hướng sau khi đăng nhập thành công
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Login failed! Please check your credentials.");
    } finally {
      setIsLoading(false); // Dừng loading khi có phản hồi từ API
    }
  };
  const handleSignUp = () => {
    navigate("/register"); // Điều hướng đến trang đăng ký
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
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}{" "}
              {/* Hiển thị thông báo lỗi */}
              <Form onSubmit={handleLogin}>
                <Form.Group className="form-outline mb-4">
                  <Form.Control
                    type="email"
                    id="form1Example13"
                    className="form-control-lg"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="form-outline mb-4">
                  <Form.Control
                    type="password"
                    id="form1Example23"
                    className="form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    id="form1Example3"
                    label="Remember me"
                    defaultChecked
                  />
                  <a href="#!">Forgot password?</a>
                </div>

                <Button
                  type="submit"
                  className="btn-lg btn-block me-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status" size="sm">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                <Button className="btn-lg btn-success" onClick={handleSignUp}>
                  Sign up
                </Button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <Button
                  className="btn-lg btn-block me-1"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                >
                  <i className="fab fa-facebook-f me-2"></i>Continue with
                  Facebook
                </Button>
                <Button
                  className="btn-lg btn-block"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                >
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
