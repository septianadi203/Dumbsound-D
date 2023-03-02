import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Modal,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import logo from "../assets/logo.png";
import icon_add_artis from "../assets/icon_add_artis.png";
import icon_add_music from "../assets/icon_add_music.png";
import icon_logout from "../assets/icon_logout.png";
import icon_pay from "../assets/icon_pay.png";
import profile from "../assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { RoomsContext } from "../context/roomsContext";

function Navbars() {
  const navigate = useNavigate();

  const {
    loginShow,
    setLoginShow,
    handleLoginClose,
    handleLoginShow,
    registerShow,
    setRegisterShow,
    handleRegisterClose,
    handleRegisterShow,
    goToLogin,
    goToRegister,
  } = useContext(RoomsContext);

  // Register
  const [register, setRegister] = useState({
    roleid: "2",
    fullname: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });
  const handleChangeRegister = (e) => {
    const { name, type } = e.target;
    setRegister({
      ...register,
      [name]: type === "file" ? e.target.files : e.target.value,
    });
  };
  const handleRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("roleid", register.roleid);
      formData.append("fullname", register.fullname);
      formData.append("email", register.email);
      formData.append("password", register.password);
      formData.append("gender", register.gender);
      formData.append("phone", register.phone);
      formData.append("address", register.address);

      const response = await API.post("/register", formData);
      console.log("Successfully added user", response);

      register.roleid = "";
      register.fullname = "";
      register.email = "";
      register.password = "";
      register.gender = "";
      register.phone = "";
      register.address = "";

      setRegisterShow(false);
      setLoginShow(true);

      register.fullname = "";
      register.email = "";
      register.password = "";
      register.roleid = "";
      register.gender = "";
      register.phone = "";
      register.address = "";
    } catch (error) {
      alert("Failed to register", error);
    }
  });

  // Login
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  const handleChangeLogin = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", login);

      if (response.data.code === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        alert("Successfully logged in");

        setLoginShow(false);
        setLogin(true);

        response.data.data.role.name === "Admin"
          ? navigate("/admin")
          : navigate("/");
      } else {
        alert("gagal login");
      }
    } catch (error) {
      alert("Login failed");
      setLoginShow(true);
    }
  });

  // Popover
  const popOverAdmin = (
    <Popover id="popover-basic">
      <Popover.Body className="d-flex flex-column gap-3 p-0 bg-dark">
        <div className="d-flex align-items-center gap-4 ps-4 pt-4 pe-5">
          <Image src={icon_add_music} />
          <Link
            to="/admin/add-music"
            className="text-decoration-none text-black"
          >
            <h5 className="m-0 text-white">Add Music</h5>
          </Link>
        </div>
        <div className="d-flex align-items-center gap-4 ps-4 pe-5">
          <Image src={icon_add_artis} />
          <Link
            to="/admin/add-artist"
            className="text-decoration-none text-black"
          >
            <h5 className="m-0 text-white">Add Artis</h5>
          </Link>
        </div>

        <hr
          className="m-0"
          style={{
            height: "5px",
            backgroundColor: "#FFFFFF",
          }}
        />
        <div className="d-flex align-items-center gap-4 ps-4 pb-4 pe-5">
          <Image src={icon_logout} />
          <Link
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              // navigate("/");
            }}
            to={"/"}
            className="text-decoration-none text-black"
          >
            <h5 className="m-0 pe-auto text-white">Logout</h5>
          </Link>
        </div>
      </Popover.Body>
    </Popover>
  );
  const popOverUser = (
    <Popover id="popover-basic">
      <Popover.Body className="d-flex flex-column gap-3 p-0 bg-dark">
        <div className="d-flex align-items-center gap-4 ps-4 pt-4 pe-5">
          <Image src={icon_pay} />
          <Link to="/pay" className="text-decoration-none text-black">
            <h5 className="m-0 text-white">Pay</h5>
          </Link>
        </div>

        <hr
          className="m-0"
          style={{
            height: "5px",
            backgroundColor: "#FFFFFF",
          }}
        />
        <div className="d-flex align-items-center gap-4 ps-4 pb-4 pe-5">
          <Image src={icon_logout} />
          <Link
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              // navigate("/");
            }}
            to={"/"}
            className="text-decoration-none text-black"
          >
            <h5 className="m-0 pe-auto text-white">Logout</h5>
          </Link>
        </div>
      </Popover.Body>
    </Popover>
  );

  // Role
  // let { data: roles } = useQuery("rolesCache", async () => {
  //   const response = await API.get("/roles");
  //   return response.data.data;
  // });

  return (
    <>
      <Navbar fixed="top" expand="lg">
        <Container>
          <Navbar.Brand className="text-white">
            {localStorage.getItem("role") === "Admin" ? (
              <Link to="/admin" className="text-decoration-none text-white">
                <Image
                  alt="logo"
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top me-2"
                />
                Dumbsound
              </Link>
            ) : (
              <Link to="/" className="text-decoration-none text-white">
                <Image
                  alt="logo"
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top me-2"
                />
                Dumbsound
              </Link>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-3">
              {localStorage.getItem("token") ? (
                <>
                  {localStorage.getItem("role") === "Admin" ? (
                    <OverlayTrigger
                      trigger="click"
                      rootClose
                      placement="bottom"
                      overlay={popOverAdmin}
                    >
                      <Image
                        src={profile}
                        width={42}
                        height={42}
                        className="rounded-circle"
                      />
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      trigger="click"
                      rootClose
                      placement="bottom"
                      overlay={popOverUser}
                    >
                      <Image
                        src={profile}
                        width={42}
                        height={42}
                        className="rounded-circle"
                      />
                    </OverlayTrigger>
                  )}
                </>
              ) : (
                <>
                  <Nav.Link
                    className="border rounded px-4 text-white"
                    onClick={handleLoginShow}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    className="rounded px-4 text-white"
                    onClick={handleRegisterShow}
                    style={{ backgroundColor: "#EE4622" }}
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Modal Sign In Awal */}
      <Modal size="sm" centered show={loginShow} onHide={handleLoginClose}>
        <Modal.Body
          className="rounded py-4 px-4"
          style={{ backgroundColor: "#161616" }}
        >
          <Form onSubmit={(e) => handleLogin.mutate(e)}>
            <Modal.Title className="fw-bold mb-4 text-white">Login</Modal.Title>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                value={login.email}
                name="email"
                onChange={handleChangeLogin}
                placeholder="Email"
                style={{ backgroundColor: "#454545" }}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Control
                type="password"
                value={login.password}
                name="password"
                onChange={handleChangeLogin}
                placeholder="Password"
                style={{ backgroundColor: "#454545" }}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-3">
              <Button
                variant="w-100 text-white py-2"
                type="submit"
                style={{ backgroundColor: "#EE4622" }}
              >
                Login
              </Button>
              <Form.Group className="d-flex justify-content-center gap-1">
                <Form.Label className="text-secondary">
                  Don't have an account? Klik
                </Form.Label>
                <Form.Label
                  className="text-secondary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={goToRegister}
                >
                  Here
                </Form.Label>
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal Sign In Akhir */}
      {/* Modal Sign Up Awal */}
      <Modal
        size="sm"
        centered
        show={registerShow}
        onHide={handleRegisterClose}
      >
        <Modal.Body
          className="rounded py-4 px-4"
          style={{ backgroundColor: "#161616" }}
        >
          <Form onSubmit={(e) => handleRegister.mutate(e)}>
            <Modal.Title className="fw-bold mb-4 text-white">
              Register
            </Modal.Title>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                value={register?.email}
                name="email"
                placeholder="Email"
                onChange={handleChangeRegister}
                style={{ backgroundColor: "#454545" }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                value={register?.password}
                name="password"
                placeholder="Password"
                onChange={handleChangeRegister}
                style={{ backgroundColor: "#454545" }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={register?.fullname}
                name="fullname"
                placeholder="Full Name"
                onChange={handleChangeRegister}
                style={{ backgroundColor: "#454545" }}
              />
            </Form.Group>
            {/* <Form.Group className="mb-4" controlId="roleid">
              <Form.Select
                name="roleid"
                style={{ backgroundColor: "#454545" }}
                value={register?.roleid}
                onChange={handleChangeRegister}
              >
                <option>Role</option>
                {roles?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group> */}
            <Form.Group className="mb-4">
              <Form.Select
                name="gender"
                style={{ backgroundColor: "#454545" }}
                onChange={handleChangeRegister}
              >
                <option disabled selected>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={register?.phone}
                name="phone"
                placeholder="Phone"
                onChange={handleChangeRegister}
                style={{ backgroundColor: "#454545" }}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={register?.address}
                name="address"
                placeholder="Address"
                onChange={handleChangeRegister}
                style={{ backgroundColor: "#454545" }}
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-3">
              <Button
                variant="w-100 text-white py-2"
                type="submit"
                style={{ backgroundColor: "#EE4622" }}
              >
                Register
              </Button>
              <Form.Group className="d-flex justify-content-center gap-1">
                <Form.Label className="text-secondary">
                  Already have an account? Klik
                </Form.Label>
                <Form.Label
                  className="text-secondary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={goToLogin}
                >
                  Here
                </Form.Label>
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal Sign Up Akhir */}
    </>
  );
}

export default Navbars;
