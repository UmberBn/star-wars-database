import styled from "styled-components";
import { Layout, Menu as AntdMenu } from "antd";

export const Container = styled(Layout)``;

export const Header = styled(Layout.Header)`
  background-color: black;
  align-items: center;
`;

export const Logo = styled.div`
  margin-right: 10px;
  float: left;
`;
export const Menu = styled(AntdMenu)`
  background-color: black;
  border-bottom: none;

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: transparent !important;
  }
  .ant-menu-horizontal,
  .ant-menu-item,
  .ant-menu-horizontal,
  .ant-menu-sub,
  .ant-menu-light,
  .ant-menu-submenu,
  .ant-menu-submenu-title,
  .ant-menu-vertical,
  .ant-menu,
  .ant-menu-title-content {
    background-color: black;
    color: white;
  }
`;

export const MenuItem = styled(AntdMenu.Item)`
  background-color: black;
  color: white;
`;

export const Content = styled(Layout.Content)`
  min-height: 80vh;
  background-color: #222d2e;
  padding: 25px;
`;

export const CenterContent = styled.div`
  min-height: 280px;
  padding: 24px;
  background: #fff;
  border-radius: 5px;
`;

export const Footer = styled(Layout.Footer)`
  background-color: blue;
`;
