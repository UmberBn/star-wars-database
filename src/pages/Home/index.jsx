import React from "react";
import { Typography } from "antd";

import { Container } from "./styles";

function Home() {
  return (
    <Container>
      <Typography.Title>Sobre</Typography.Title>
      <Typography.Paragraph>
        Site criado para compartilhar conhecimento sobre o universo de Star
        Wars, os dados compartilhados aqui vem por meio da{" "}
        <Typography.Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://swapi-trybe.herokuapp.com/"
        >
          Swapi - Trybe API
        </Typography.Link>
        .
      </Typography.Paragraph>
      <Typography.Paragraph>
        Para utilizar o site basta acessar um dos menus que estão na navegação
        superior da página, cada menu carregará uma tabela referente ao seu
        nome.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Caso tenha alguma sugestão/dúvida encaminhe um e-mail para:
        humberto-bandeira@hotmail.com
      </Typography.Paragraph>

      <Typography.Paragraph>Projeto sem fins lucrativos.</Typography.Paragraph>
    </Container>
  );
}

export default Home;
