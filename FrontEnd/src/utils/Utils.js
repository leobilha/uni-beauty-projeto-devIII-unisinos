export function FileToBase64(inputFile) {
  if (inputFile) {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  }
}

export function RemoveFormatFromBase64(input) {
  try {
    let splited = input.split(",");
    if (splited[1].length > 1) {
      return splited[1];
    }
  } catch (e) {
    new DOMException("Problem spliting Data/DataType");
  }
  return "error";
}
export function cpfCnpjFormater(value) {
  try {
    if (value) {
      const unmasked = value.replace(/\D/g, "");
      let result = "";
      let mask = "";

      if (unmasked.length > 0 && unmasked.length <= 11) {
        mask = "999.999.999-99";
      } else if (unmasked.length > 0 && unmasked.length <= 14) {
        mask = "99.999.999/9999-99";
      }

      for (let i = 0, pos = 0; i < mask.length; i++) {
        if (isNaN(mask[i])) {
          result += mask[i];
        } else {
          result += unmasked[pos];
          pos++;
          if (pos === unmasked.length) break;
        }
      }

      return result;
    } else {
      return "";
    }
  } catch (e) { }
}
export function cpfCnpjUnformater(value) {
  try {
    if (value) {
      const unmasked = value.replace(/\D/g, "");
      let result = "";
      let mask = "";

      if (unmasked.length > 0 && unmasked.length <= 11) {
        mask = "99999999999";
      }

      if (unmasked.length > 0 && unmasked.length <= 14) {
        mask = "99999999999999";
      }

      for (let i = 0, pos = 0; i < mask.length; i++) {
        if (isNaN(mask[i])) {
          result += mask[i];
        } else {
          result += unmasked[pos];
          pos++;
          if (pos === unmasked.length) break;
        }
      }

      return result;
    } else {
      return "";
    }
  } catch (e) { }
}
export function formatMoeda(valor) {
  const len = valor.length;
  let result = "";

  if (len <= 3) {
    for (let i = 2; i >= len; i--) {
      result += "0";
    }
  } else {
    if (valor[0] === "0") valor = valor.slice(1, len);
  }
  result += valor;

  let finalResult = "";
  let cont = 1;
  for (let i = result.length - 1; i >= 0; i--) {
    finalResult = result[i] + finalResult;
    if (i !== 0) {
      if (result.length - i === 2) finalResult = "," + finalResult;

      if (result.length - (i + 2) === 3 * cont) {
        finalResult = "." + finalResult;
        cont++;
      }
    }
  }

  return finalResult;
}
export function BuildArrayDados(_text) {
  let _arrayDados = [];

  if (_text !== "") {
    const _arrayText = _text.split("\n" || []);

    _arrayText.forEach((element) => {
      let _objDado = element.split(";");
      _arrayDados.push(_objDado);
    });
  }

  return _arrayDados;
}

export async function isThisFieldAccessible(accesses, oidPage, permissionsField) {
  if (accesses && accesses?.status !== "Erro") {
    let foundPageOIDIndex = await accesses.findIndex((item) => (oidPage.startsWith(item.Oid + ".") || oidPage === item.Oid) && item.Valor?.toUpperCase().includes(permissionsField?.toUpperCase()));
    return foundPageOIDIndex >= 0
  }
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};