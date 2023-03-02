import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbars from "./components/Navbars";
import Beranda from "./pages/Beranda";
import Pay from "./pages/Pay";
import Transaction from "./pages/Transaction";
import AddMusic from "./pages/AddMusic";
import AddArtist from "./pages/AddArtist";
import PageNotFound from "./pages/Error";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import Music from "./pages/Music";
import "react-jinke-music-player/assets/index.css";
import AllMusic from "./pages/AllMusic";
import { RoomsContextProvider } from "./context/roomsContext";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      } else {
        if (localStorage.role === "Admin") {
          navigate("/admin");
        } else if (localStorage.role === "User") {
          navigate("/");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;

      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <RoomsContextProvider>
        <Navbars />
        <Routes>
          <Route path="/" element={<Beranda />}></Route>
          <Route path="/music/:id" element={<Music />}></Route>
          <Route path="/all-music/" element={<AllMusic />}></Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/pay" element={<Pay />}></Route>
          </Route>

          <Route path="/admin" element={<PrivateRouteAdmin />}>
            <Route path="/admin" element={<Transaction />}></Route>
            <Route path="/admin/add-music" element={<AddMusic />}></Route>
            <Route path="/admin/add-artist" element={<AddArtist />}></Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </RoomsContextProvider>
    </>
  );
}

export default App;
