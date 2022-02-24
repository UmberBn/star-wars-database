import { notification } from "antd";

const BASE_ENDPOINT = "https://swapi-trybe.herokuapp.com/api";

const fetchPlanets = async (params = {}) => {
  try {
    let url = new URL(`${BASE_ENDPOINT}/planets/`)
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const response = await fetch(url);
    const planetsData = await response.json();
    return [planetsData, null];
  } catch {
    notification.error({
      message: "Ocorreu um erro ao tentar listar os planetas",
    });
    return [null, true];
  }
}
const fetchFilms = async () => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/films/`);
    const filmsData = await response.json();
    return [filmsData, null];
  } catch {
    notification.error({
      message: "Ocorreu um erro ao tentar listar os filmes",
    });
    return [null, true];
  }
};

export { fetchPlanets, fetchFilms };
