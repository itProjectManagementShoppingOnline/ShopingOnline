/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken } from '@/utils/auth';


const HEADER = {
  'Content-Type': 'application/json',
};

const options = {
  baseURL: '',
  headers: {
    post: HEADER,
    put: HEADER,
    patch: HEADER,
    delete: HEADER,
  },
};

const ErrorTextEnum = {
  ERROR_401: '抱歉，您没有权限/登录超时',
  ERROR_403: '抱歉，您没有权限，请联系管理员',
  ERROR_404: '接口不存在',
  ERROR_UNKNOWN: '未知的网络错误',
  ERROR_ABORT: '未知的网络错误:网络中断/请求超时',
};

const axiosInstance = axios.create(options);


function getErrorTExt(httpStatusCode) {
  let text = '';
  switch (httpStatusCode) {
    case 401:
    case 403:
    case 404:
      text = ErrorTextEnum[`ERROR_${httpStatusCode}`];
      break;
    default:
      text = `${ErrorTextEnum.ERROR_UNKNOWN}:${httpStatusCode}`;
      break;
  }
  return text;
}

function showNetworkError(resp) {
  let text = '';

  if (resp && resp.status) {
    text = getErrorTExt(resp.status);
  } else {
    text = ErrorTextEnum.ERROR_ABORT;
  }
  console.warn(text);
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (getToken()) {
      console.log(`JWT ${getToken()}`);
      config.headers.Authorization = `JWT ${getToken()}`;
    }
    return config;
  },
  err => Promise.reject(err));

axiosInstance.interceptors.response.use(response => response, (error) => {
  showNetworkError(error.response);
  return Promise.reject(error.response);
});

export default axiosInstance;
