import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

function Layout({ children }) {
  return <Container>{children}</Container>;
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Layout;
