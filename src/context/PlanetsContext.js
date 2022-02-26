import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchPlanets } from "../api";

const PlanetsContext = createContext({});

function Provider({ children }) {
  const DEFAULT_NUMERIC_FILTER = {
    column: "",
    comparison: "",
    value: 0,
  };

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

  const DEFAULT_OPTIONS = [
    "population",
    "orbital_period",
    "diameter",
    "rotation_period",
    "surface_water",
  ];

  const [allPlanets, setAllPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPlanets, setTotalPlanets] = useState(0);
  const [filters, setFilters] = useState(FILTERS_INITIAL_STRUCTURE);
  const [avaiableFilterOptions, setAvaiableFilterOptions] =
    useState(DEFAULT_OPTIONS);
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
    if (
      filters.filterByNumericValues[filters.filterByNumericValues.length - 1]
        .column &&
      filters.filterByNumericValues[filters.filterByNumericValues.length - 1]
        .comparison &&
      filters.filterByNumericValues[filters.filterByNumericValues.length - 1]
        .value
    ) {
      setFilters({
        ...filters,
        filterByNumericValues: [
          ...filters.filterByNumericValues,
          DEFAULT_NUMERIC_FILTER,
        ],
      });
    }
  }, [allPlanets, filters]);

  const data = {
    allPlanets,
    filters,
    fetchingPlanets,
    filteredPlanets,
    currentPage,
    totalPlanets,
    avaiableFilterOptions,
    setAllPlanets,
    setFilters,
    setFetchingPlanets,
    setFilteredPlanets,
    setCurrentPage,
    setTotalPlanets,
    setAvaiableFilterOptions,
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
