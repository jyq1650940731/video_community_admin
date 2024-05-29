/*
 * @Author: YourName
 * @Date: 2024-05-10 22:50:23
 * @LastEditTime: 2024-05-28 11:04:44
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_admin\src\api\user.ts
 * 版权声明
 */
import request from '@/utils/request';
import type { responseData } from '@/types/api';
import type { loginForm } from '@/types/request';

enum API {
  LOGIN_URL = '/login',
  USERINFO_URL = '/user/userinfo',
  LOGOUT_URL = '/user/logout',
}

export const login = (data: loginForm) =>
  request<any, responseData>({
    url: API.LOGIN_URL,
    method: 'post',
    data,
  });


  export const logout = () => {
    request({
      url: API.LOGOUT_URL,
      method: 'get',
    });
  };
export const getUserInfo = () =>
  request<any, responseData>({
    url: API.USERINFO_URL,
    method: 'get',
  });
