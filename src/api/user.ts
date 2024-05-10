import request from '@/utils/request';
import type { responseData } from '@/types/api';
import type { loginForm } from '@/types/request';

enum API {
  LOGIN_URL = '/login',
  USERINFO_URL = '/userinfo',
}

export const login = (data: loginForm) =>
  request<any, responseData>({
    url: API.LOGIN_URL,
    method: 'post',
    data,
  });

export const getUserInfo = () =>
  request<any, responseData>({
    url: API.USERINFO_URL,
    method: 'get',
  });
