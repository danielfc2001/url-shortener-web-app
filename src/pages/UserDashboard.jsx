import DashboardUserInfo from "../components/DashboardComponents/DashboardUserInfo";
import DashboardShortenerForm from "../components/DashboardComponents/DashboardShortenerForm";
import DashboardSavedUrlCard from "../components/DashboardComponents/DashboardSavedUrlCard";
import DashboardSearch from "../components/DashboardSearch";
import DashboardUrlsLoader from "../components/DashboardUrlsLoader";
import { useQuery } from "@tanstack/react-query";
import { getUserLinks } from "../services/userLinks";

const UserDashboard = () => {
  const {
    isLoading,
    isError,
    data: userLinks,
  } = useQuery({
    queryKey: ["userLinks"],
    queryFn: async () => await getUserLinks(),
  });
  return (
    <>
      <section className="dashboard-container">
        <DashboardShortenerForm />
        <DashboardUserInfo />
      </section>
      <div className="container-separator"></div>
      {/* <DashboardSearch /> */}
      <section
        id="dashboardCardContainer"
        className="dashboard-saved-url-container row g-3"
      >
        {isLoading && <DashboardUrlsLoader />}
        {!isLoading && isError && (
          <p>A ocurrido un error al cargar los datos</p>
        )}
        {!isLoading &&
          !isError &&
          userLinks &&
          userLinks.data.map((el) => (
            <DashboardSavedUrlCard
              id={el._id}
              title={el.title === null ? undefined : el.title}
              description={el.description === null ? undefined : el.description}
              baseUrl={el.baseUrl}
              shortenedUrl={el.shortUrl}
              key={el._id}
            />
          ))}
      </section>
    </>
  );
};

export default UserDashboard;
