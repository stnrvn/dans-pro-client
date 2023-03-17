import axios from "axios"
import { getLocalAccessToken } from "./token_helper";

//apply base url for axios
const API_URL = process.env.REACT_APP_API_BASE_URL

const axiosApi = axios.create({
    baseURL: API_URL,
})

const token = getLocalAccessToken();
axiosApi.defaults.headers.common["access_token"] = token

export async function get(url, config = {}) {
  return await axiosApi.get(url, {...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, {...data }, {...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, {...data }, {...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, {...config })
    .then(response => response.data)
}