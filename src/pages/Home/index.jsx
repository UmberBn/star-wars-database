import React, { useContext } from "react";
import { Button, Col, Empty, Form, Input, Row, Table, Tooltip } from "antd";
import formatDate from "../../utils/formatDate";
import getIdFromUrl from "../../utils/getIdFromUrl";
import PlanetsContext from "../../context/PlanetsContext";
import FilmsContext from "../../context/FilmsContext";
import { LinkButton } from "../../components";
import DynamicFilters from "../../components/DynamicFilters";
import {
  Container,
  FiltersContainer,
  FiltersPanel,
  FilmsTag,
  Subtitle,
} from "./styles";

function Home() {
  const {
    filteredPlanets,
    fetchingPlanets,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    totalPlanets,
    avaiableFilterOptions,
    applyNumericFilters
  } = useContext(PlanetsContext);
  const { allFilms, fetchingFilms } = useContext(FilmsContext);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      fixed: "left",
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
      render: (urls) => {
        var intersection = allFilms.filter((film) => {
          return urls.indexOf(film.url) > -1;
        });

        return intersection.map((film) => (
          <FilmsTag key="film">{film.title}</FilmsTag>
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
      title: "Ver mais",
      dataIndex: "url",
      key: "url",
      render: (url) => {
        const planetId = getIdFromUrl(url);
        return (
          <LinkButton label="Visitar" onClick={() => console.log(planetId)} />
        );
      },
    },
  ];

  return (
    <Container>
      <FiltersContainer bordered={false} defaultActiveKey={["1"]}>
        <FiltersPanel header="Filtros" key="1">
          <Form layout="vertical">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Form.Item label="Nome" name="name">
                  <Input
                    value={filters.filterByName.name}
                    onChange={(event) => {
                      setFilters({
                        ...filters,
                        filterByName: { name: event.target.value },
                      });
                      setCurrentPage(1);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Tooltip title="Permite filtrar os planetas que estão atualmente sendo mostrados na tabela por seus atributos.">
              <Subtitle>Filtrar por atributos na tabela</Subtitle>
            </Tooltip>
            {filters.filterByNumericValues.map(
              (filter, index) =>
                index < avaiableFilterOptions.length && (
                  <Row key={index}>
                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                      <DynamicFilters
                        key={index}
                        value={filter.value}
                        index={index}
                        comparison={filter.comparison}
                        column={filter.column}
                      />
                    </Col>
                  </Row>
                )
            )}
            <Row>
              <Col>
                <Button type="primary" onClick={applyNumericFilters}>Filtrar</Button>
              </Col>
            </Row>
          </Form>
        </FiltersPanel>
      </FiltersContainer>
      <Table
        dataSource={filteredPlanets}
        columns={columns}
        scroll={{ y: 500, x: 1200 }}
        locale={{
          emptyText: <Empty description="Nenhum planeta encontrado 🤖" />,
        }}
        bordered
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          pageSize: 10,
          total: totalPlanets,
          hideOnSinglePage: false,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
        }}
        loading={fetchingFilms || fetchingPlanets}
      />
    </Container>
  );
}

export default Home;
