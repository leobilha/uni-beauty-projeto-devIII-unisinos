import { DEFAULT_API_URLS_OVVO } from "../enum";
import * as enviroment from "../enviroment";
import axios from "axios";

const urlApi = DEFAULT_API_URLS_OVVO[enviroment.getEnviroment()];

export function LerCertificate() {
  return new Promise((resolve, reject) => {
    axios
      .get(urlApi + "/LerCertificate/", {
        headers: { "Content-Type": "application/json" },
      })
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}
