import { DEFAULT_API_URLS_SAFEID } from "../enum";
import * as enviroment from "../enviroment";
import axios from "axios";

const urlApi = DEFAULT_API_URLS_SAFEID[enviroment.getEnviroment()];

export function GerarHsmSafeId(objHsm, access_token) {
  return new Promise((resolve, reject) => {
    axios
      .post(urlApi + "/GerarHsm/", objHsm, {
        headers: {
          "Content-Type": "application/json",
          access_token: access_token
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}