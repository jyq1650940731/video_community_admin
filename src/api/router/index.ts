import request from '@/utils/request';
import type { menuResponseData } from './type';

enum API {
  MENU_URL = '/router/menu',
}

export const getMenu = () =>
  request<any, menuResponseData>({
    url: API.MENU_URL,
    method: 'get',
  });
