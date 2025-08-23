import { clearAuth, getAuth } from "./strorage";

export function setAuthorizationHeader(params) {
  const { request, token } = params;

  request.headers["Authorization"] = `Bearer ${token}`;
}

function onRequest(config) {
  const { token } = getAuth();

  if (token) {
    setAuthorizationHeader({ request: config, token });
  }

  return config;
}
function onRequestError(error) {
  return Promise.reject(error);
}
function onResponse(response) {
  return response.data;
}

function onResponseError(error) {
  const { config, response } = error;
  if (response?.statu === 401 && !config.__isRetryRequest) {
    clearAuth();
  }
  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
