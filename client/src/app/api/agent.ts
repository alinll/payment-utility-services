import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(config => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

axios.interceptors.response.use(async response => {
  await sleep();
  return response
}, (error: AxiosError) => {
  const { data, status } = error.response as AxiosResponse;

  switch(status) {
    case 400:
      if (data.errors) {
        const modelStateErrors: string[] = [];

        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateErrors.push(data.errors[key])
          }
        }

        throw modelStateErrors.flat();
      }
      toast.error(data.title);
      break;
    case 401:
      toast.error(data.title);
      break;
    case 500:
      router.navigate('server-error', {state: {error: data}});
      break;
    default:
      break;
  }

  return Promise.reject(error.response);
})

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
  list: () => requests.get('services'),
  details: (id: number) => requests.get(`services/${id}`),
  getMeasure: (id: number) => requests.get(`services/measures?id=${id}`)
}

const Basket = {
  get: () => requests.get('basket'),
  addItem: (serviceId: number) => requests.post(`basket?serviceId=${serviceId}`, {}),
  removeItem: (serviceId: number) => requests.delete(`basket?serviceId=${serviceId}`)
}

const Account = {
  login: (values: any) => requests.post('account/login', values),
  register: (values: any) => requests.post('account/register', values),
  currentUser: () => requests.get("account/currentUser"),
  logout: () => requests.post('account/logout', {})
}

const agent = {
  Catalog,
  Basket,
  Account
}

export default agent;