import axios, { AxiosRequestConfig, HeadersDefaults } from 'axios';
import { DocumentNode } from 'graphql';

const axiosInstance = axios.create();

export const apiClient = async <T = any, R = any>(data: T, token?: string) => {
  const commonHeaders: HeadersDefaults = {
    common: { 'Content-Type': 'application/json' },
    delete: { 'Content-Type': 'application/json' },
    get: { 'Content-Type': 'application/json' },
    head: { 'Content-Type': '*' },
    post: { 'Content-Type': 'application/json' },
    put: { 'Content-Type': 'application/json' },
    patch: { 'Content-Type': 'application/json' },
  };
  axiosInstance.defaults.baseURL = `${process.env.NUXT_API_GRAPHQL_URL}`;
  axiosInstance.defaults.headers = commonHeaders;
  let config: AxiosRequestConfig = {};
  let headers = null;
  if (token !== undefined && token!=='') {
    headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
  }

  config = {
    method: 'post',
    data,
  };
  if (headers) {
    config.headers = headers;
  }
  const result: R = await axiosInstance.request(config);
  await Promise.resolve();
  if (result) {
    return result;
  }
  return null;
};

export const parseGraphQL = (query: DocumentNode): string | undefined => {
  return query.loc?.source.body;
};
