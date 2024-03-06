import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserLink } from "../../services/userLinks";
import { useShortener } from "../../context/ShortenerContext";

const DashboardUrlCardDeleteBtn = ({ id }) => {
  const { newMessageDeletedLink } = useShortener();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => await deleteUserLink(id),
    onSuccess: async (deletedLink) => {
      await queryClient.setQueryData(["userLinks"], (cachedData) => {
        const newData = cachedData.data.filter(
          (item) => item._id != deletedLink.deleted._id
        );
        newMessageDeletedLink(deletedLink.message);
        return {
          data: newData,
        };
      });
    },
  });
  const handleClick = (e) => {
    if (confirm("Esta seguro que desea eliminar el elemento seleccionado?.")) {
      mutate(id);
    }
  };
  return (
    <button
      type="button"
      className="dashboard-url-card-delete-btn"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <svg
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-clockwise"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
      ) : (
        <svg
          className="icon icon-tabler icon-tabler-trash-filled"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
            stroke-width="0"
            fill="currentColor"
          />
          <path
            d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
            stroke-width="0"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
};

export default DashboardUrlCardDeleteBtn;
