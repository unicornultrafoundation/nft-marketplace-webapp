export const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
export const urlRegex = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$", // fragment locator
  "i",
);
export const noWhitespaceRegex = new RegExp("[^-s]");
export const alphabetOnlyRegex = new RegExp(/^[A-Z]+$/i);
export const noSpecialCharacterRegex = new RegExp(/^[A-Za-z0-9 ]+$/);
export const numberRegex = new RegExp(/^[0-9 ]+$/);
export const decimalRegex = new RegExp(/^[0-9]+([.,][0-9]+)?$/);
export const nameRegex = new RegExp(/^[A-Za-z0-9_-]{3,25}$/);
export const usernameRegex = new RegExp(/^[A-Za-z0-9_ -]{3,25}$/);
