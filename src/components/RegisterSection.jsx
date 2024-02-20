import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import FormDashboardTextError from "./FormDashboardTextError";
import DashboardFormAlert from "./DashboardFormAlert";
import AuthSectionSpinner from "./AuthSectionSpinner";

const RegisterSection = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({
    message: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registrationPending, registerUser } = useAuth();

  const onSubmit = async (data) => {
    const error = await registerUser(data.username, data.password);
    if (error) {
      setRegisterErrors({
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (registerErrors.message != null) {
      const timer = setTimeout(() => {
        setRegisterErrors({
          message: null,
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registerErrors]);

  const changePasswordVisibility = (e) => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <>
      <form className="access-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Registrate</h3>
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
          {registrationPending ? (
            <>
              <AuthSectionSpinner />
              Registrando
            </>
          ) : (
            <>Registrarse</>
          )}
        </button>
        <div className="mt-2">
          {registerErrors.message != null && (
            <DashboardFormAlert
              message={registerErrors.message}
              style={"alert"}
            />
          )}
        </div>
        <span>
          Ya tienes una cuenta?. <Link to="/access/login">Accede</Link>
        </span>
      </form>
    </>
  );
};

export default RegisterSection;
