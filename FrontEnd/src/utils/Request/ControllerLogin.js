import { DEFAULT_API_URLS } from "../enum";
import * as enviroment from "../enviroment";
import axios from "axios";

const urlApi = DEFAULT_API_URLS[enviroment.getEnviroment()];

export function Login(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(urlApi + "/user/login/", data, {
        headers: { "Content-Type": "application/json" }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
