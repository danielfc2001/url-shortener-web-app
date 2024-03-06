import { useForm } from "react-hook-form";
import FormDashboardTextError from "../FormDashboardTextError";
import DashboardFormAlert from "../DashboardFormAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserLink } from "../../services/userLinks";
import { useShortener } from "../../context/ShortenerContext";
import AuthSectionSpinner from "../AuthSectionSpinner";

const DashboardShortenerForm = () => {
  const { newMessageDeletedLink } = useShortener();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data) => createUserLink(data),
    onSuccess: (newLink) => {
      queryClient.setQueryData(["userLinks"], (cachedData) => {
        newMessageDeletedLink("Nuevo enlace agregado satisfactoriamente.");
        return {
          data: [...cachedData.data, newLink.data],
        };
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  return (
    <>
      <form className="shortener-form-user" onSubmit={handleSubmit(onSubmit)}>
        <div className="shortener-form-user-input-group">
          <input
            type="text"
            {...register("baseUrl", {
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
        {isError && (
          <DashboardFormAlert message={error.message} style={"alert"} />
        )}
        <button
          type="submit"
          className="shortener-form-user-submit"
          disabled={isPending}
        >
          {isPending && <AuthSectionSpinner />}
          Crear Url
        </button>
      </form>
    </>
  );
};

export default DashboardShortenerForm;
