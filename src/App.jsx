import { Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Copyright from "./components/Copyright";
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

function App() {
  const { userAuthenticated, statusAuthenticated } = useAuth();
  return (
    <>
      <main id="appContainer" className="container px-5">
        <Navbar>
          <Link to="/" className="page-navbar-brand">
            Url.ZIP
          </Link>
          <ul className="page-navbar-nav">
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
          <Route path="/access/" element={<AccessPage />}>
            <Route path="/access/login" element={<LoginSection />} />
            <Route path="/access/register" element={<RegisterSection />} />
          </Route>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
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
        </ToastContainer>
        <Footer>
          <Copyright />
        </Footer>
      </main>
    </>
  );
}

export default App;
