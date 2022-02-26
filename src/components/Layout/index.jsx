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
import { useLocation, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const history = useLocation();
  const navigate = useNavigate();
  console.log(history);
  const markCurrentActiveMenu = () => {
    if (history.pathname.includes("planets")) {
      return "planets";
    }
    return "home";
  };
  return (
    <Container>
      <Header>
        <Logo>
          <img src="/star-wars-logo.svg" width={80} />
        </Logo>
        <Menu mode="horizontal" selectedKeys={[markCurrentActiveMenu()]}>
          <MenuItem key="home" onClick={() => navigate("/")}>
            Home
          </MenuItem>
          <MenuItem key="planets" onClick={() => navigate("/planets")}>
            Planetas
          </MenuItem>
        </Menu>
      </Header>
      <Content>
        <CenterContent>{children}</CenterContent>
      </Content>
      <Footer>
        <p>
          Feito pelo padawan{" "}
          <a
            href="https://github.com/UmberBn"
            target="_blank"
            rel="noopener noreferrer"
          >
            UmberBn
          </a>
          , que a força esteja com você!
        </p>
      </Footer>
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
