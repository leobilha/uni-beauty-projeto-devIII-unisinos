import { DEFAULT_API_URLS_OVVO_SAFEID } from "../enum";
import * as enviroment from "../enviroment";
import axios from "axios";

const urlApi = DEFAULT_API_URLS_OVVO_SAFEID[enviroment.getEnviroment()];

export function ConsultaPSCSafeId(access_token) {
  let data = "";
  return new Promise((resolve, reject) => {
    axios
      .post(urlApi + "/ConsultaPSC/", data, {
        headers: {
          "Content-Type": "application/json",
          access_token: access_token,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
