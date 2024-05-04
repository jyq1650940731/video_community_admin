import request from '@/utils/request';
import type { responseData } from './types';

enum API {
  LIST_URL = '/system/userManage',
}

export const getList = (params: any) =>
  request<any, responseData>({
    url: API.LIST_URL,
    method: 'get',
    params,
  });
