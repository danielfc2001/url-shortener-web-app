import React, { useState } from "react";
import { useShortener } from "../context/ShortenerContext";

const DashboardSearch = () => {
  const [searchData, setSearchData] = useState("");
  const [foundsState, setFoundsState] = useState(false);
  const {
    quickSearchShorteneds,
    searchUserShortenedUrl,
    quickSearchShortenedUrl,
  } = useShortener();

  const handleSearch = async (e) => {
    const searched = await searchUserShortenedUrl(searchData);
    if (searched) {
      setFoundsState(searched);
    } else {
      setFoundsState(false);
    }
  };

  const handleChangeInput = async (e) => {
    const searched = await quickSearchShortenedUrl(searchData);
    if (searched) {
      setFoundsState(searched);
    } else {
      setFoundsState(false);
    }
  };

  return (
    <>
      <div className="dashboard-search-bar">
        <input
          type="text"
          className=""
          placeholder="Escriba algo para buscar"
          onChange={(e) => setSearchData(e.target.value)}
          onKeyUp={handleChangeInput}
        />
        <button type="button" className="" onClick={handleSearch}>
          <i className="bi bi-search me-2"></i>Buscar
        </button>
      </div>
      {foundsState && (
        <span className="dashboard-search-result-text">
          Se han encontrado {quickSearchShorteneds.length} resultados para tu
          busqueda.
        </span>
      )}
    </>
  );
};

export default DashboardSearch;
