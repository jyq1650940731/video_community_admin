import type { RouteRecordRaw } from 'vue-router';

export interface RoutesModuleType {
  menuList: RouteRecordRaw[];
  routeList: RouteRecordRaw[];
  
}

declare interface UserModuleType {
  token: string | boolean;
  username: string;
  avatar: string;
}
