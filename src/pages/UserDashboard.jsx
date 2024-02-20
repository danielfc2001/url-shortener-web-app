import DashboardUserInfo from "../components/DashboardUserInfo";
import DashboardShortenerForm from "../components/DashboardShortenerForm";
import DashboardSavedUrlCard from "../components/DashboardSavedUrlCard";
import { useShortener } from "../context/ShortenerContext";
import DashboardModalCard from "../components/DashboardModalCard";
import DashboardSearch from "../components/DashboardSearch";
import DashboardUrlsLoader from "../components/DashboardUrlsLoader";

const UserDashboard = () => {
  const {
    shortenedUrls,
    pendingShorteneds,
    modalCardActive,
    quickSearchShorteneds,
  } = useShortener();
  return (
    <>
      <section className="d-flex align-items-start justify-content-center mt-3">
        <DashboardShortenerForm />
        <DashboardUserInfo />
      </section>
      <DashboardSearch />
      <section
        id="dashboardCardContainer"
        className="dashboard-saved-url-container row g-3 mt-3"
      >
        {modalCardActive.status && (
          <DashboardModalCard id={modalCardActive.id} />
        )}
        {pendingShorteneds ? (
          <DashboardUrlsLoader />
        ) : (
          quickSearchShorteneds.map((el) => (
            <DashboardSavedUrlCard
              id={el._id}
              title={el.title === null ? undefined : el.title}
              description={el.description === null ? undefined : el.description}
              baseUrl={el.baseUrl}
              shortenedUrl={el.shortUrl}
              key={el._id}
            />
          ))
        )}
      </section>
    </>
  );
};

export default UserDashboard;
