import React from "react";
import PropTypes from "prop-types";

import {
  Container,
  Header,
  Content,
  Footer,
  Menu,
  MenuItem,
  Logo,
  CenterContent,
} from "./styles";

function Layout({ children }) {
  return (
    <Container>
      <Header>
        <Logo>
          <img src="/star-wars-logo.svg" width={80} />
        </Logo>
        <Menu mode="horizontal" defaultSelectedKeys={["planets"]}>
          <MenuItem key="planets">Planetas</MenuItem>
          <MenuItem key="characters">Personagens</MenuItem>
        </Menu>
      </Header>
      <Content>
        <CenterContent>{children}</CenterContent>
      </Content>
      <Footer></Footer>
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Layout;
