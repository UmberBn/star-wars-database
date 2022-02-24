import { notification } from "antd";

const BASE_ENDPOINT = "https://swapi-trybe.herokuapp.com/api";

const fetchPlanets = async () => {
  try {
    const planetsData = await fetch(`${BASE_ENDPOINT}/planets/`);
    return [planetsData, null];
  } catch {
    notification.error({
      message: "Ocorreu um erro ao tentar listar os planetas",
    });
    return [null, true];
  }
};

export default fetchPlanets;