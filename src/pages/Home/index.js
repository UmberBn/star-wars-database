import { Col, Form, Input, Row } from "antd";
import React from "react";
import { Container, FiltersContainer, FiltersPanel } from "./styles";

function Home() {
  return (
    <Container>
      <FiltersContainer bordered={false} defaultActiveKey={["1"]}>
        <FiltersPanel header="Filtros" key="1">
          <Form layout="vertical" wrapperCol={6}>
            <Row>
              <Col span={8}>
                <Form.Item label="Nome" name="name" wrapperCol={12}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </FiltersPanel>
      </FiltersContainer>
      Home{" "}
    </Container>
  );
}

export default Home;
