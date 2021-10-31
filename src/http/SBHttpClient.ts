import axios from "axios";
/**
 * This axios instance can be used for making requests to the SB api. On this instance Authentication headers could be set for instance in the future.
 */
export default axios.create({
  baseURL: "http://localhost:8080/api/",
});
