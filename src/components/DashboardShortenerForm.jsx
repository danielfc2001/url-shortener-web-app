import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormDashboardTextError from "./FormDashboardTextError";
import { useShortener } from "../context/ShortenerContext";
import DashboardFormAlert from "./DashboardFormAlert";

const DashboardShortenerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { insertPending, insertStatus, createUserShortenedUrl } =
    useShortener();

  const onSubmit = (data) => {
    createUserShortenedUrl(data);
    reset();
  };

  useEffect(() => {
    console.log(insertPending);
  }, [insertPending]);

  return (
    <article className="w-50">
      <form className="shortener-form-user" onSubmit={handleSubmit(onSubmit)}>
        <div className="shortener-form-user-input-group">
          <input
            type="text"
            {...register("url", {
              required: { value: true, message: "Este campo es requerido." },
            })}
            placeholder="Ingrese la url"
          />
          {errors.url && (
            <FormDashboardTextError message={errors.url.message} />
          )}
        </div>
        <div className="shortener-form-user-input-group">
          <input
            type="text"
            {...register("title", {
              maxLength: {
                value: 50,
                message: "El titulo puede tener un máximo de 50 caracteres.",
              },
            })}
            placeholder="Titulo (opcional)"
          />
          {errors.title && (
            <FormDashboardTextError message={errors.title.message} />
          )}
        </div>
        <div className="shortener-form-user-input-group">
          <textarea
            {...register("description", {
              maxLength: {
                value: 255,
                message:
                  "La descripcion puede tener un maximo de 255 caracteres.",
              },
            })}
            rows={2}
            placeholder="Descripcion (opcional)"
          />
          {errors.description && (
            <FormDashboardTextError message={errors.description.message} />
          )}
        </div>
        {insertStatus.status === 200 && (
          <DashboardFormAlert
            message={insertStatus.message}
            style={"success"}
          />
        )}
        {insertStatus.status === 400 && (
          <DashboardFormAlert message={insertStatus.message} style={"alert"} />
        )}
        <button type="submit">
          {insertPending && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          Crear Url
        </button>
      </form>
    </article>
  );
};

export default DashboardShortenerForm;
