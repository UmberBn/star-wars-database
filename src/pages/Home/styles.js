import { Collapse } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  overflow: scroll;
  overflow-y: hidden;
`;

export const FiltersContainer = styled(Collapse)``;

export const FiltersPanel = styled(Collapse.Panel)``;

export const FilmsTag = styled.p`
  border-bottom: 1px solid blue;
`;
