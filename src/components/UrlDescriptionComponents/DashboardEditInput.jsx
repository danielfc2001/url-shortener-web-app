import { useForm } from "react-hook-form";
import FormDashboardTextError from "../FormDashboardTextError";
import DashboardEditSuccess from "./DashboardEditSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserLink } from "../../services/userLinks";
import { useShortener } from "../../context/ShortenerContext";

const DashboardEditInput = ({ id, type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { newMessageDeletedLink } = useShortener();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: async ({ data, id, type }) =>
      await updateUserLink(data, id, type),
    onSuccess: async (updated) => {
      await queryClient.setQueryData(["userLinks"], (oldData) => {
        newMessageDeletedLink(
          "Se actualizo el campo con éxito. Debe refrescar para ver los cambios."
        );
        return {
          data: oldData.data.map((item) => {
            if (item._id === updated.update._id) {
              return updated.update;
            }
            return item;
          }),
        };
      });
    },
  });

  const onSubmit = async (data) => {
    console.log(id, type);
    mutate({ data, id, type });
    reset();
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
    <form className="dashboard-edit-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="dashboard-edit-input"
        {...register("editInput", {
          required: {
            value: true,
            message: "Este campo es requerido.",
          },
          maxLength: maxLengthInputValue(type),
        })}
        placeholder="Editar campo"
      />
      <button type="submit" className="dashboard-edit-confirm">
        {!isPending ? (
          <>
            <i className="bi bi-upload me-1"></i>Cambiar
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
      {isError && <FormDashboardTextError message={error.message} />}
      {errors.editInput && (
        <FormDashboardTextError message={errors.editInput.message} />
      )}
      {isSuccess && <DashboardEditSuccess />}
    </form>
  );
};

export default DashboardEditInput;
