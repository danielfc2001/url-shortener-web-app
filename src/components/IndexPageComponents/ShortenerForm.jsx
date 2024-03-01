import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import qrCode from "qrcode";
import FormDashboardTextError from "../FormDashboardTextError";
import usePublicShortener from "../../hooks/usePublicShortener";
import DashboardUrlsLoader from "../DashboardUrlsLoader";
import ShortenerResultsMessage from "../ShortenerResultsMessage";

const ShortenerForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    isPending,
    errors: shortenedErrors,
    shortenedLink,
    generateShortenedLink,
    handleCopyLink,
    handleOpenLink,
  } = usePublicShortener();

  useEffect(() => {
    if (!shortenedLink) return;
    qrCode.toDataURL(
      document.getElementById("qrcodeContainer"),
      shortenedLink,
      (error) => {
        if (error) console.log(error);
      }
    );
  }, [shortenedLink]);

  const onSubmit = (data) => {
    generateShortenedLink(data);
    reset();
  };

  return (
    <>
      <form className="shortener-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("baseUrl", {
            required: {
              value: true,
              message: "Debe llenar este campo para guardar su link.",
            },
          })}
          className="shortener-input"
          placeholder="Introduce el enlace"
        />
        <button type="submit" className="shortener-btn">
          Acortar
        </button>
      </form>
      {errors.baseUrl && (
        <FormDashboardTextError message={errors.baseUrl.message} />
      )}
      {isPending && (
        <div className="d-flex justify-content-center w-100 mt-3">
          <DashboardUrlsLoader />
        </div>
      )}
      {!isPending && shortenedErrors.message != null && (
        <ShortenerResultsMessage
          type={"error"}
          message={shortenedErrors.message}
        />
      )}
      {!isPending && shortenedErrors.message === null && shortenedLink && (
        <section className="shortener-result-section">
          <canvas id="qrcodeContainer"></canvas>
          <div className="shortener-result-description">
            <ShortenerResultsMessage
              type={"success"}
              message={"Su enlace se a creado satisfactoriamente."}
            />
            <span className="shortener-result">
              {shortenedLink}
              <div>
                <button
                  type="button"
                  className="shortener-result-btn me-2"
                  onClick={handleCopyLink}
                >
                  Copy
                </button>
                <button
                  type="button"
                  className="shortener-result-btn"
                  onClick={handleOpenLink}
                >
                  Open Link
                </button>
              </div>
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default ShortenerForm;
