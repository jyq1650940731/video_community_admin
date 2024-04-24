import 'element-plus/theme-chalk/el-message-box.css'
import { useUserStore } from '@/stores/modules/user';
import config from '@/config';
import axios from 'axios';
import { ElMessageBox } from 'element-plus';
import { removeToken } from './token';
import router from '@/router';


const { statusName,tokenTableName } = config

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

//拦截请求
request.interceptors.request.use((config) => {
  const { getToken } = useUserStore()
  if (getToken) config.headers[tokenTableName] = `${getToken}`
  return config
},(error) => Promise.reject(error));

let isRefreshing = false
//拦截响应
request.interceptors.response.use(
  (response:any) => {
    const { data, status } = response
    const code = data && data[statusName] ? data[statusName] : status
    if (code === 1001) {
      if (isRefreshing) return Promise.reject(response)
      isRefreshing = true
      ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面,或确认重新登录', '登录过期', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        removeToken()
        router.push({
          name: 'login',
          query: {
            redirect: router.currentRoute.value.fullPath
          }
        })
      }).finally(() => {
        isRefreshing = false
      })
      return Promise.reject(response)
    }
    return response.data;
  },
  (error:any) => {
    //处理错误
    let message = '';
    const status = error.response.status;
    switch (status) {
      case '401':
        message = 'TOKEN过期';
        break;
      case '403':
        message = '无权访问';
        break;
      case '404':
        message = '请求地址出错';
        break;
      case '500':
        message = '服务器出错';
        break;
      default:
        message = '网络问题';
        break;
    }

    //返回错误信息
    Promise.reject(error);
  },
);


export default request;