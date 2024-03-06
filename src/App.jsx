import { Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Copyright from "./components/FooterComponents/Copyright";
import AccessPage from "./pages/Access";
import LoginSection from "./components/LoginSection";
import RegisterSection from "./components/RegisterSection";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import ToastContainer from "./components/ToastContainer";
import LoginToasts from "./components/LoginToasts";
import NotFound from "./pages/404";
import NavbarLink from "./components/NavbarLink";
import Logout from "./pages/Logout";
import UrlDescription from "./pages/UrlDescription";
import { useState } from "react";
import { useShortener } from "./context/ShortenerContext";
import Toast from "./components/Toast";

function App() {
  const [navbarVisible, setNavbarVisible] = useState();
  const { userAuthenticated, statusAuthenticated } = useAuth();
  const { messageDeletedLink } = useShortener();

  const handleToggleClick = (e) => {
    const togglerBtn = document.getElementById("togglerBtn");
    if (navbarVisible === "show") {
      togglerBtn.classList.remove("active");
      setNavbarVisible();
      return;
    }
    togglerBtn.classList.add("active");
    setNavbarVisible("show");
  };

  return (
    <>
      <main id="appContainer" className="container px-5">
        <Navbar>
          <Link to="/" className="page-navbar-brand">
            SwiftURL
          </Link>
          <button
            id="togglerBtn"
            type="button"
            className="page-navbar-toggle"
            onClick={handleToggleClick}
          >
            <i className="bi bi-list"></i>
          </button>
          <ul className={`page-navbar-nav ${navbarVisible}`}>
            <NavbarLink to={"/"} name={"Inicio"}>
              <i className="bi bi-house me-1"></i>
            </NavbarLink>
            {userAuthenticated ? (
              <>
                <NavbarLink to={"/user-dashboard"} name={"Panel"}>
                  <i className="bi bi-speedometer2 me-1"></i>
                </NavbarLink>
                <NavbarLink to={"/logout"} name={"Salir"}>
                  <i className="bi bi-box-arrow-right me-1"></i>
                </NavbarLink>
              </>
            ) : (
              <NavbarLink to={"/access/login"} name={"Acceder"}>
                <i className="bi bi-box-arrow-in-right me-1"></i>
              </NavbarLink>
            )}
          </ul>
        </Navbar>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/access//*" element={<AccessPage />}>
            <Route path="login" element={<LoginSection />} />
            <Route path="register" element={<RegisterSection />} />
          </Route>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard/url/:id"
            element={
              <ProtectedRoute>
                <UrlDescription />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer>
          {statusAuthenticated.status && (
            <LoginToasts message={statusAuthenticated.message} />
          )}
          {messageDeletedLink && (
            <Toast message={messageDeletedLink} key={messageDeletedLink} />
          )}
        </ToastContainer>
        <Footer>
          <Copyright />
        </Footer>
      </main>
    </>
  );
}

export default App;
