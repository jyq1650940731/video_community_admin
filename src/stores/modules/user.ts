import { defineStore } from 'pinia';
import { ref, computed, type ComputedRef } from 'vue';
import type { loginForm } from '@/types/request';
import { getUserInfo as userInfo, login as loginApi, logout } from '@/api/user';
import {
  getToken as getTokenApi,
  removeToken,
  setToken as setTokenApi,
} from '@/utils/token';

import { ElMessage, ElNotification } from 'element-plus';
import { isString } from '@/utils/validate';
import router from '@/router';

export const useUserStore = defineStore('user', () => {
  //state
  const token = ref(getTokenApi() as string);
  const nickname = ref('');
  const avatar = ref('');
  const isCollapse = ref(false);

  //getters
  const getToken = computed(() => {
    return token.value;
  });
  const getnickname = computed(() => {
    return nickname.value;
  });
  const getAvatar = computed(() => {
    return avatar.value;
  });

  //action
  const collapseChange = () => {
    isCollapse.value = !isCollapse.value;
  };

  const setToken = (T: string) => {
    token.value = T;
    setTokenApi(token.value);
  };

  /**
   * @description 设置用户名
   * @param {*} nickname
   */
  const setnickname = (u: string) => {
    nickname.value = u;
  };
  /**
   * @description 设置头像
   * @param {*} avatar
   */
  const setAvatar = (a: string) => {
    avatar.value = a;
  };

  const afterLogin = (T: string) => {
    setToken(T);
    const hour = new Date().getHours();
    const thisTime =
      hour < 8
        ? '早上好'
        : hour <= 11
          ? '上午好'
          : hour <= 13
            ? '中午好'
            : hour < 18
              ? '下午好'
              : '晚上好';
    ElNotification({
      title: `${thisTime}！`,
      message: `欢迎登录后台管理系统`,
      type: 'success',
    });
  };

  const login = async (userInfo: loginForm) => {
    const { message, result } = await loginApi(userInfo);
    if (!result) {
      ElNotification({
        message: message,
        type: 'error',
      });
      return Promise.reject(new Error(message));
    }
    afterLogin(result.token);
    return 'ok';
  };

  const userLogout = async () => {
    await logout();
    token.value = '';
    nickname.value = '';
    avatar.value = '';
    removeToken();
    router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.fullPath,
      },
    });
  };

  const getUserInfo = async () => {
    const {
      result: { nikename, avatarUrl },
    } = await userInfo();
    if ((nikename && !isString(nikename)) || (avatarUrl && !isString(avatarUrl))) {
      const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确';
      ElMessage.error(err);
      throw err;
    } else {
      // 如不使用nickname用户名,可删除以下代码
      if (nickname) setnickname(nikename);
      // 如不使用avatar头像,可删除以下代码
      if (avatar) setAvatar(avatarUrl);
      return 'ok';
    }
  };

  return {
    token,
    nickname,
    avatar,
    isCollapse,
    getToken,
    getnickname,
    getAvatar,
    login,
    userLogout,
    getUserInfo,
    collapseChange,
  };
});
