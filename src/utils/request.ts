/*
 * @Author: YourName
 * @Date: 2024-05-10 22:50:23
 * @LastEditTime: 2024-05-29 11:54:56
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_admin\src\utils\request.ts
 * 版权声明
 */
import { useUserStore } from '@/stores/modules/user';
import config from '@/config';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { removeToken } from './token';
const { tokenTableName, tokenFail,successCode } = config;

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

//拦截请求
request.interceptors.request.use(
  (config) => {
    const token = useUserStore().token;
    if (token) config.headers[tokenTableName] = `${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

//拦截响应
request.interceptors.response.use(
  (response: any) => {
    const code = response.data.code;
    if (!successCode.includes(code)) {
      ElMessage({
        message: `${response.data.message}`,
        type: 'error',
      });
      return Promise.reject(new Error(response.data.message));
    }
    return response.data;
  },
  (error: any) => {
      //处理错误
      let message = '';
      const status = error.response.status;
      switch (status) {
        case 401:
          message = 'TOKEN过期';
          removeToken();
          break;
        case 403:
          message = '无权访问';
          break;
        case 404:
          message = '请求地址出错';
          break;
        case 500:
          message = '服务器出错';
          break;
        default:
          message = '网络问题';
          break;
      }
      ElMessage({
        message,
        type: 'error',
      });
  
      Promise.reject(error);
    },
);

export default request;
