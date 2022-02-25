import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchFilms } from "../api";

const FilmsContext = createContext({});

function Provider({ children }) {
  const [allFilms, setAllFilms] = useState([]);
  const [fetchingFilms, setFetcthingFilms] = useState(false);

  useEffect(() => {
    const getFilms = async () => {
      setFetcthingFilms(true);
      const [filmsData] = await fetchFilms();
      setFetcthingFilms(false);
      if (filmsData && filmsData?.results?.length > 0) {
        setAllFilms([...filmsData.results]);
      }
    };
    getFilms();
  }, []);

  const data = {
    allFilms,
    fetchingFilms,
    setAllFilms,
  };
  return <FilmsContext.Provider value={data}>{children}</FilmsContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { Provider };
export default FilmsContext;
