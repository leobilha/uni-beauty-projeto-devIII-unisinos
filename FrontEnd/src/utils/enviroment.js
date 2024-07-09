export function getEnviroment() {
  if (window.location.host.match("localhost")) {
    return "LOCAL";
  }
}
