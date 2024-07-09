export function getEnviroment() {
  if (window.location.host.match("localhost")) {
    // return "LOCAL";
    return "PRODUCTION";
  } else if (window.location.host.match("luizdesenv")) {
    return "DEVELOPMENT";
  } else if (window.location.host.match("luizteste")) {
    return "TEST";
  } else if (window.location.host.match("homologacao")) {
    return "STAGING";
  } else if (window.location.host.match("ovvo")) {
    return "PRODUCTION";
  }
}
