import axios from "axios";

export const api = axios.create({
  baseURL: `https://newnoticias.digital-gov.com/api/cms`,
});
