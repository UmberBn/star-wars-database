import React from 'react';
import { Provider } from './PlanetsContext'
import PropTypes from "prop-types";

// import { Container } from './styles';

function GlobalContext({ children }) {
  return (
    <Provider>
      { children }
    </Provider>
  );
}

GlobalContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default GlobalContext;