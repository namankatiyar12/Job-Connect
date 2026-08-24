import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
const apiRoot = `${apiBaseUrl.replace(/\/$/, "")}/api/v1`;

axios.defaults.timeout = 15000;

export const USER_API_END_POINT = `${apiRoot}/user`;
export const JOB_API_END_POINT = `${apiRoot}/job`;
export const APPLICATION_API_END_POINT = `${apiRoot}/application`;
export const COMPANY_API_END_POINT = `${apiRoot}/company`;
