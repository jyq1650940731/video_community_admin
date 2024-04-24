import { defineStore } from "pinia";
import { ref,computed } from "vue";
import {type loginForm } from '@/api/user/type'
import {login as loginApi} from '@/api/user'
import { getToken as getTokenApi , removeToken, setToken as setTokenApi } from '@/utils/token'
import 'element-plus/es/components/notification/style/css'
import {  ElNotification } from "element-plus";

export const useUserStore = defineStore('user',()=>{
    //state
    let token = ref(getTokenApi() as string);

    //getters
    const getToken = computed(()=>{
        return token.value;
    })

    //action
    const setToken =(T: string) => {
        token.value = T;
        setTokenApi(token.value);
    }

    const afterLogin = (T:string) =>{
        setToken(T);
        const hour = new Date().getHours()
        const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
            ? '上午好'
            : hour <= 13
              ? '中午好'
              : hour < 18
                ? '下午好'
                : '晚上好'
      ElNotification({
        title: `${thisTime}！`,
        message: `欢迎登录后台管理系统`,
        type: 'success',
      })
    }

    const login = async (userInfo:loginForm)=> {
       const {data} = await loginApi(userInfo);
       if(!data.token){
        ElNotification({
            message: data.message,
            type: 'error',
          })
        return Promise.reject(new Error(data.message))
        ;
       };
       afterLogin(data.token);
       return 'ok';
    }
    
    return {
        token,
        getToken,
        login,
    }
})