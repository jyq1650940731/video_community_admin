import request from '@/utils/request';
import type { responseData } from '@/types/api';

enum API {
  MENU_URL = '/router/menu',
}

export const getMenu = () =>
  request<any, responseData>({
    url: API.MENU_URL,
    method: 'get',
  });
