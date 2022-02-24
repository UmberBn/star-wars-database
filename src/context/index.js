import React from "react";
import PropTypes from "prop-types";
import { Provider as PlanetsProvider } from "./PlanetsContext";
import { Provider as FilmsProvider } from "./FilmsContext";

// import { Container } from './styles';

function GlobalContext({ children }) {
  return (
    <PlanetsProvider>
      <FilmsProvider>{children}</FilmsProvider>
    </PlanetsProvider>
  );
}

GlobalContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default GlobalContext;
