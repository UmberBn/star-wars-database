import React, { useContext } from "react";
import { Col, Empty, Form, Input, Row, Table } from "antd";
import formatDate from "../../utils/formatDate";
import PlanetsContext from "../../context/PlanetsContext";
import { Container, FiltersContainer, FiltersPanel } from "./styles";

function Home() {
  const { filteredPlanets } = useContext(PlanetsContext);
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Período de Rotação",
      dataIndex: "rotation_period",
      key: "rotation_period",
    },
    {
      title: "Período de Orbita",
      dataIndex: "orbital_period",
      key: "orbital_period",
    },
    {
      title: "Diâmetro",
      dataIndex: "diameter",
      key: "diameter",
    },
    {
      title: "Clima",
      dataIndex: "climate",
      key: "climate",
    },
    {
      title: "Gravidade",
      dataIndex: "gravity",
      key: "gravity",
    },
    {
      title: "Terreno",
      dataIndex: "terrain",
      key: "terrain",
    },
    {
      title: "Água na superfície",
      dataIndex: "surface_water",
      key: "surface_water",
    },
    {
      title: "População",
      dataIndex: "population",
      key: "population",
    },
    {
      title: "Filmes",
      dataIndex: "films",
      key: "films",
      render: (text, _movies, index) => {
        return text.map((movie) => (
          <span key={`${movie}${index}`}>{movie}</span>
        ));
      },
    },
    {
      title: "Criado",
      dataIndex: "created",
      key: "created",
      render: (date) => <p>{formatDate(date)}</p>,
    },
    {
      title: "Editado",
      dataIndex: "edited",
      key: "edited",
      render: (date) => <p>{formatDate(date)}</p>,
    },
    {
      title: "Link",
      dataIndex: "url",
      key: "url",
    },
  ];
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
      <Table
        dataSource={filteredPlanets}
        columns={columns}
        locale={{
          emptyText: <Empty description="Nenhum planeta encontrado 🤖" />,
        }}
      />
    </Container>
  );
}

export default Home;
