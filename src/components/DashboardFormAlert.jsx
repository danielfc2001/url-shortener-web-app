const DashboardFormAlert = ({ message, style }) => {
  return (
    <div className={`dashboard-form-alert ${style}`}>
      {style === "success" ? (
        <i className="bi bi-check-circle me-1"></i>
      ) : (
        <i className="bi bi-exclamation-circle me-1"></i>
      )}
      {message}
    </div>
  );
};

export default DashboardFormAlert;
