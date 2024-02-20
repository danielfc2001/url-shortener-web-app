import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import FormDashboardTextError from "./FormDashboardTextError";
import DashboardFormAlert from "./DashboardFormAlert";
import AuthSectionSpinner from "./AuthSectionSpinner";

const LoginSection = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [authErrors, setAuthErrors] = useState({
    message: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registrationPending, loginUser } = useAuth();

  const onSubmit = async (data) => {
    const error = await loginUser(data.username, data.password);
    if (error) {
      setAuthErrors({
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (authErrors.message != null) {
      setTimeout(() => {
        setAuthErrors({
          message: null,
        });
      }, 5000);
    }
  }, [authErrors]);

  const changePasswordVisibility = (e) => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <>
      <form className="access-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Inicia Secion</h3>
        <input
          id="username"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "El nombre de usuario es requerido.",
            },
          })}
          className="access-form-input"
          placeholder="Nombre de usuario"
        />
        {errors.username && (
          <FormDashboardTextError message={errors.username.message} />
        )}
        <div className="access-form-password">
          <input
            id="password"
            type={passwordVisibility ? "text" : "password"}
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es requerida.",
              },
            })}
            className="access-form-input"
            placeholder="Contrasena"
          />
          <span
            className="access-form-password-visibility"
            role="button"
            onClick={changePasswordVisibility}
          >
            {passwordVisibility ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </span>
        </div>
        {errors.password && (
          <FormDashboardTextError message={errors.password.message} />
        )}
        <button type="submit">
          {" "}
          {registrationPending ? (
            <>
              <AuthSectionSpinner />
              Accediendo
            </>
          ) : (
            <>Acceder</>
          )}
        </button>
        <div className="mt-2">
          {authErrors.message != null && (
            <DashboardFormAlert message={authErrors.message} style={"alert"} />
          )}
        </div>
        <span>
          No tienes una cuenta?. <Link to="/access/register">Registrate</Link>
        </span>
      </form>
    </>
  );
};

export default LoginSection;
