import { DEFAULT_API_URLS } from "../enum";
import * as enviroment from "../enviroment";
import axios from "axios";

const urlApi = DEFAULT_API_URLS[enviroment.getEnviroment()];

export function GerarHsmAPI(objHsm) {
  let data = "";
  return new Promise((resolve, reject) => {
    axios
      .post(urlApi + "/GerarHsm/", objHsm)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
