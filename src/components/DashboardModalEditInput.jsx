import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormDashboardTextError from "./FormDashboardTextError";
import { useShortener } from "../context/ShortenerContext";
import DashboardModalEditSuccess from "./DashboardModalEditSuccess";

const DashboardModalEditInput = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { updatePending, updateUserShortenedUrl } = useShortener();
  const [updateErrors, setUpdateErrors] = useState({
    field: null,
    message: null,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateErrors.field != null) {
      setTimeout(() => {
        setUpdateErrors({
          field: null,
          message: null,
        });
      }, 5000);
    }
  }, [updateErrors]);

  const onSubmit = async (data) => {
    const error = await updateUserShortenedUrl(data, type);
    if (error) {
      setUpdateErrors({
        field: type,
        message: error,
      });
    } else {
      setUpdateSuccess(true);
      reset();
    }
  };

  const maxLengthInputValue = (type) => {
    switch (type) {
      case "title":
        return {
          value: 50,
          message: "El titulo no debe ser mayor a 50 caracteres.",
        };
      case "description":
        return {
          value: 255,
          message: "La descripcion no debe ser mayor a 255 caracteres.",
        };
      default:
        return;
    }
  };

  return (
    <form
      className="dashboard-modal-edit-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        className="dashboard-modal-edit-input"
        {...register("editInput", {
          required: {
            value: true,
            message: "Este campo es requerido.",
          },
          maxLength: maxLengthInputValue(type),
        })}
        placeholder="Editar campo"
      />
      <button type="submit" className="dashboard-modal-edit-confirm">
        {!updatePending ? (
          <>
            <i class="bi bi-upload me-1"></i>Cambiar
          </>
        ) : (
          <>
            <span
              className="spinner-border spinner-border-sm me-1"
              aria-hidden="true"
            ></span>
            <span role="status">Actualizando...</span>
          </>
        )}
      </button>
      {updateErrors.field === type && (
        <FormDashboardTextError message={updateErrors.message} />
      )}
      {errors.editInput && (
        <FormDashboardTextError message={errors.editInput.message} />
      )}
      {updateSuccess && <DashboardModalEditSuccess />}
    </form>
  );
};

export default DashboardModalEditInput;
