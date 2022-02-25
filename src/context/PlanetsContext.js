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
  const [totalPlanets, setTotalPlanets] = useState(0);
  const [filters, setFilters] = useState(FILTERS_INITIAL_STRUCTURE);
  const [fetchingPlanets, setFetchingPlanets] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      setFetchingPlanets(true);
      const querys = filters?.filterByName?.name
        ? { page: currentPage, search: filters.filterByName.name }
        : { page: currentPage };
      const [planetsData] = await fetchPlanets(querys);
      setTotalPlanets(planetsData?.count || 0);
      setFetchingPlanets(false);
      if (planetsData && planetsData?.results?.length > 0) {
        setAllPlanets([...planetsData.results]);
      } else {
        setAllPlanets([]);
      }
    };
    getPlanets();
  }, [currentPage, filters.filterByName.name]);

  useEffect(() => {
    setFilteredPlanets(allPlanets);
  }, [allPlanets, filters]);

  const data = {
    allPlanets,
    filters,
    fetchingPlanets,
    filteredPlanets,
    currentPage,
    totalPlanets,
    setAllPlanets,
    setFilters,
    setFetchingPlanets,
    setFilteredPlanets,
    setCurrentPage,
    setTotalPlanets,
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
