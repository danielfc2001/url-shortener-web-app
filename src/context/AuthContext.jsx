import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOSTNAME } from "../env/externalsUrls.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context must be use within a Provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: null,
    username: null,
  });
  const [statusAuthenticated, setStatusAuthenticated] = useState({
    status: false,
    message: null,
  });
  const [registrationPending, setRegistrationPending] = useState(false);
  const navigate = useNavigate();

  const closeAuthToasts = () => {
    setStatusAuthenticated({
      status: false,
      message: null,
    });
  };

  useEffect(() => {
    if (statusAuthenticated.status) {
      const timer = setTimeout(() => {
        closeAuthToasts();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusAuthenticated]);

  const loginUser = async (user, password) => {
    try {
      setRegistrationPending(true);
      const userData = JSON.stringify({
        username: user,
        password,
      });
      const response = await fetch(`${HOSTNAME}/user/login`, {
        method: "POST",
        body: userData,
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status >= 400 && response.status < 500) {
        const responseMessage = await response.json();
        throw {
          message: responseMessage.message,
        };
      }
      if (!response.ok)
        throw {
          message: "A ocurrido un error al procesar la peticion.",
        };
      const data = await response.json();
      if (!data)
        throw {
          message: "A ocurrido un error al procesar la peticion.",
        };
      setUserAuthenticated(true);
      setUserInfo(data.user);
      localStorage.setItem("token", data.token);
      setStatusAuthenticated({ status: true, message: data.message });
      navigate("/user-dashboard");
    } catch (error) {
      return error;
    } finally {
      setRegistrationPending(false);
    }
  };

  const registerUser = async (user, password) => {
    try {
      setRegistrationPending(true);
      const userData = JSON.stringify({
        username: user,
        password,
      });
      const response = await fetch(`${HOSTNAME}/user/create`, {
        method: "POST",
        body: userData,
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status === 400) {
        const responseMessage = await response.json();
        throw {
          message: responseMessage.message,
        };
      }
      if (!response.ok)
        throw {
          message: "A ocurrido un error al procesar la peticion.",
        };
      const data = await response.json();
      if (!data)
        throw {
          message: "A ocurrido un error al procesar la peticion.",
        };
      setStatusAuthenticated({
        status: true,
        message: `${data.message}. Accede para gestionar tus enlaces.`,
      });
      navigate("/access/login");
    } catch (error) {
      return error;
    } finally {
      setRegistrationPending(false);
    }
  };

  const verifyUser = async () => {
    try {
      const storage = localStorage.getItem("token");
      if (!storage) throw new Error();
      const response = await fetch(`${HOSTNAME}/user/${storage}`);
      if (response.status === 400) {
        localStorage.clear();
      }
      if (!response.ok) throw new Error();

      const data = await response.json();

      if (!data) throw new Error();

      setUserAuthenticated(true);

      setUserInfo(data.user);
    } catch (error) {}
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const logoutUser = () => {
    localStorage.clear();
    setUserAuthenticated(false);
    setUserInfo({
      id: null,
      username: null,
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated,
        userInfo,
        statusAuthenticated,
        registrationPending,
        closeAuthToasts,
        loginUser,
        logoutUser,
        registerUser,
        verifyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
