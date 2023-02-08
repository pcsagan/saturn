import axios, { AxiosInstance } from 'axios';

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignInOAuth = {
  email: string;
  profile: string;
};

export type BackendUser = {
  authorization: string;
  email: string;
  name: string;
  image: string;
};

export const api: AxiosInstance = axios.create({
  baseURL: 'http://10.0.0.50:1122',
  withCredentials: true,
});

export async function signIn(
  data?: SignInCredentials | SignInOAuth
): Promise<BackendUser> {
  return api
    .post('/auth/signin', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
}

export async function post(url: string, token: string, data?: any) {
  const auth = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return await api
    .post(url, data, auth)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
}
