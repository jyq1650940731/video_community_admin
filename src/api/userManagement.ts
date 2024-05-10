import request from '@/utils/request';
import type { addUserData, responseData, updataUserData } from '@/types/api';

enum API {
  LIST_URL = '/sytemManage/users',
  ADD_URL = '/sytemManage/users/addUser',
  UPDATA_URL = '/sytemManage/users/updataUser',
}

export const getList = (params: any) =>
  request<any, responseData>({
    url: API.LIST_URL,
    method: 'get',
    params,
  });

export const addUser = (data: addUserData) =>
  request<any, responseData>({
    url: API.ADD_URL,
    method: 'post',
    data,
  });
export const updataUser = (data: updataUserData) =>
  request<any, responseData>({
    url: API.UPDATA_URL,
    method: 'put',
    data,
  });

export const removeUser = (id: string) =>
  request<any, responseData>({
    url: API.LIST_URL + `/${id}`,
    method: 'delete',
  });
