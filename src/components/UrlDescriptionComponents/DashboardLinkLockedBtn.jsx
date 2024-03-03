import { useState, useEffect } from "react";
import { useShortener } from "../../context/ShortenerContext";

const DashboardLinkLockedBtn = ({ id }) => {
  const [unlocked, setUnlocked] = useState(true);
  const { shortenedUrls, updateUserShortenedUrl } = useShortener();

  useEffect(() => {
    shortenedUrls.map((el) => {
      if (el._id === id) {
        setUnlocked(el.isUnlocked);
      }
    });
  }, []);

  const handleClick = async (e) => {
    const error = await updateUserShortenedUrl(!unlocked, id, "isUnlocked");
    if (!error) setUnlocked(!unlocked);
  };

  return (
    <button
      type="button"
      className="dashboard-description-locked-btn"
      onClick={handleClick}
    >
      {unlocked ? (
        <>
          <i className="bi bi-lock me-1"></i>Bloquear enlace
        </>
      ) : (
        <>
          <i className="bi bi-unlock me-1"></i>Desbloquer enlace
        </>
      )}
    </button>
  );
};

export default DashboardLinkLockedBtn;
