import { get } from "../"
import * as url from "../list_url"

const getJob = (param = '') => get(`${url.GET_JOB}${param}`)
const getJobById = (jobId) => get(`${url.GET_JOB}/${jobId}`)

export {
  getJob,
  getJobById
}