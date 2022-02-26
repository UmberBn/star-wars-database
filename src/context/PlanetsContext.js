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
    order: {
      column: "name",
      sort: "ASC",
    },
  };

  const DEFAULT_OPTIONS_FILTERS = [
    "population",
    "orbital_period",
    "diameter",
    "rotation_period",
    "surface_water",
  ];

  const DEFAULT_OPTIONS_ORDER = ["name", ...DEFAULT_OPTIONS_FILTERS];

  const [allPlanets, setAllPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPlanets, setTotalPlanets] = useState(0);
  const [filters, setFilters] = useState(FILTERS_INITIAL_STRUCTURE);
  const [avaiableFilterOptions, setAvaiableFilterOptions] = useState(
    DEFAULT_OPTIONS_FILTERS
  );
  const [fetchingPlanets, setFetchingPlanets] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const sortStrings = (a, b) => {
    if (filters.order.sort === "ASC") {
      if (a[filters.order.column] > b[filters.order.column]) {
        return 1;
      }
      if (a[filters.order.column] < b[filters.order.column]) {
        return -1;
      }

      return 0;
    } else {
      if (a[filters.order.column] < b[filters.order.column]) {
        return 1;
      }
      if (a[filters.order.column] > b[filters.order.column]) {
        return -1;
      }
    }
  };

  const sortNumbers = (a, b) => {
    if (filters.order.sort === "ASC") {
      return a[filters.order.column] - b[filters.order.column];
    } else {
      return b[filters.order.column] - a[filters.order.column];
    }
  };
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
        if (
          planetsData.results.every((item) => isNaN(item[filters.order.column]))
        ) {
          planetsData.results.sort((a, b) => sortStrings(a, b));
        } else {
          planetsData.results.sort((a, b) => {
            return sortNumbers(a, b);
          });
        }
        setAllPlanets([...planetsData.results]);
        setFilteredPlanets([...planetsData.results]);
      } else {
        setAllPlanets([]);
        setFilteredPlanets([]);
      }
    };
    getPlanets();
  }, [currentPage, filters.filterByName.name, filters.order]);

  useEffect(() => {
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
  }, [filters]);

  const applyNumericFilters = () => {
    const aux = [...allPlanets];

    const removePlanet = (planet) => {
      const planetIndex = aux.findIndex(
        (auxPlanet) => auxPlanet.name === planet.name
      );

      if (planetIndex > -1) {
        aux.splice(planetIndex, 1);
      }
    };

    allPlanets.forEach((planet) => {
      filters.filterByNumericValues.forEach(({ column, comparison, value }) => {
        if (planet[column] === "unknown") {
          removePlanet(planet, column);
        } else if (
          comparison === "maior que" &&
          !(Number(planet[column]) > value)
        ) {
          removePlanet(planet, column);
        } else if (
          comparison === "menor que" &&
          !(Number(planet[column]) < value)
        ) {
          removePlanet(planet, column);
        } else if (
          comparison === "igual a" &&
          !(Number(planet[column]) === value)
        ) {
          removePlanet(planet, column);
        }
      });
    });

    setFilteredPlanets(aux);
  };
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
    applyNumericFilters,
    DEFAULT_OPTIONS_ORDER,
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
