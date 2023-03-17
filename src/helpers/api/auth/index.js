import { post } from "../"
import * as url from "../list_url"

const login = (data) => post(url.LOGIN, data)

export {
  login
}