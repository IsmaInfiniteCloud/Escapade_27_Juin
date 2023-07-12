import axios from 'axios';

export function loginUser(loginData) {
  return axios.post("/api/users/signIn", loginData);
}
