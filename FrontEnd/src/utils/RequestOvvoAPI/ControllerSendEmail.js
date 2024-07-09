import { DEFAULT_API_URLS_OVVO } from "../enum";
import * as enviroment from "../enviroment";
import axios from "axios";

const urlApi = DEFAULT_API_URLS_OVVO[enviroment.getEnviroment()];

export function SendEmail(email) {
  return new Promise((resolve, reject) => {
    axios
      .post(urlApi + "/SendEmail/", email, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
