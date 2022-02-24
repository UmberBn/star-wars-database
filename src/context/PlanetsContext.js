import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchPlanets } from "../api";

const PlanetsContext = createContext({});

function Provider({ children }) {
  const FILTERS_INITIAL_STRUCTURE = {
    filterByName: {
      name: "",
    },
    filterByNumericValues: [
      {
        column: "",
        comparison: "",
        value: 0,
      },
    ],
  };

  const [allPlanets, setAllPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(FILTERS_INITIAL_STRUCTURE);
  const [fetchingPlanets, setFetcthingPlanets] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      setFetcthingPlanets(true);
      const [planetsData] = await fetchPlanets({ page: currentPage });
      setFetcthingPlanets(false);
      if (planetsData && planetsData?.results?.length > 0) {
        setAllPlanets([...planetsData.results]);
      }
    };
    getPlanets();
  }, [currentPage]);

  useEffect(() => {
    setFilteredPlanets(allPlanets);
  }, [allPlanets, filters]);

  const data = {
    allPlanets,
    filters,
    fetchingPlanets,
    filteredPlanets,
    currentPage,
    setAllPlanets,
    setFilters,
    setFetcthingPlanets,
    setFilteredPlanets,
    setCurrentPage,
  };
  return (
    <PlanetsContext.Provider value={data}>{children}</PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { Provider };
export default PlanetsContext;
