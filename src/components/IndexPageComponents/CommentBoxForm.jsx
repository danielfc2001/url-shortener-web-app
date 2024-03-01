import { useState } from "react";
import { useForm } from "react-hook-form";
import FormDashboardTextError from "../FormDashboardTextError";
import useComments from "../../hooks/useComments";

const CommentBoxForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rate, setRate] = useState();
  const { createNewComment } = useComments();
  const isRecommended = document.getElementById("recommended");
  const nonRecommended = document.getElementById("non-recommended");

  const onSubmit = (data) => {
    createNewComment({
      creator: data.creator,
      comment: data.comment,
      rate,
    });
    reset();
    isRecommended.classList.replace(
      "bi-hand-thumbs-up-fill",
      "bi-hand-thumbs-up"
    );
    nonRecommended.classList.replace(
      "bi-hand-thumbs-down-fill",
      "bi-hand-thumbs-down"
    );
  };

  const handleChangeRate = (e) => {
    if (e.target.dataset.rate === "recommended") {
      if (e.target.classList.contains("bi-hand-thumbs-up-fill")) {
        e.target.classList.replace(
          "bi-hand-thumbs-up-fill",
          "bi-hand-thumbs-up"
        );
        setRate();
      } else {
        nonRecommended.classList.replace(
          "bi-hand-thumbs-down-fill",
          "bi-hand-thumbs-down"
        );
        e.target.classList.replace(
          "bi-hand-thumbs-up",
          "bi-hand-thumbs-up-fill"
        );
        setRate("recommended");
      }
    } else if (e.target.dataset.rate === "non-recommended") {
      if (e.target.classList.contains("bi-hand-thumbs-down-fill")) {
        e.target.classList.replace(
          "bi-hand-thumbs-down-fill",
          "bi-hand-thumbs-down"
        );
        setRate();
      } else {
        isRecommended.classList.replace(
          "bi-hand-thumbs-up-fill",
          "bi-hand-thumbs-up"
        );
        e.target.classList.replace(
          "bi-hand-thumbs-down",
          "bi-hand-thumbs-down-fill"
        );
        setRate("non-recommended");
      }
    }
  };
  return (
    <>
      <h3 className="comment-box-published-title">
        Haganos saber su experiencia:
      </h3>
      <form className="comment-box-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("creator", {
            required: {
              value: true,
              message: "Este campo es requerido.",
            },
          })}
          className="comment-box-form-input"
          placeholder="Ingrese su nombre"
        />
        {errors.creator && (
          <FormDashboardTextError message={errors.creator.message} />
        )}
        <textarea
          type="text"
          {...register("comment", {
            required: {
              value: true,
              message: "Este campo es requerido.",
            },
          })}
          className="comment-box-form-input"
          placeholder="Ingrese su comentario"
          style={{ resize: "none" }}
        />
        {errors.comment && (
          <FormDashboardTextError message={errors.comment.message} />
        )}
        <div className="comment-box-form-group">
          <div className="comment-box-form-rate">
            <div className="comment-box-form-rate-group">
              <i
                id="recommended"
                className="bi bi-hand-thumbs-up"
                data-rate="recommended"
                onClick={handleChangeRate}
              ></i>
              <span>Recomendado</span>
            </div>
            <div className="comment-box-form-rate-group">
              <i
                id="non-recommended"
                className="bi bi-hand-thumbs-down"
                data-rate="non-recommended"
                onClick={handleChangeRate}
              ></i>
              <span>No recomendado</span>
            </div>
          </div>
          <button
            id="submitComment"
            type="submit"
            className="comment-box-form-submit"
          >
            <i className="bi bi-send-fill me-1"></i>Enviar comentario
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentBoxForm;
