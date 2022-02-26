import styled from "styled-components";
import { Form } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export const Container = styled(Form.Item)``;

export const RemoveFieldButton = styled(MinusCircleOutlined)`
  margin-left: 5px;
  transition: color 0.5s;

  &:hover {
    cursor: pointer;
    color: #f5222d;
  }
`;
