import axios from 'axios';

export function loginUser(loginData) {
  return axios.post("/api/users/signIn", loginData);
}


export function createEscapade(escapadeData) {
  return axios.post("/api/hebergement", escapadeData);
}