<template>
  <div class="login-container">
    <el-row>
      <el-col :lg="14" :md="11" :sm="24" :xl="14" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :lg="9" :md="12" :sm="24" :xl="9" :xs="24">
        <el-form class="login-form" ref="formRef" :rules="rules" :model="form">
          <div class="title">hello !</div>
          <div class="title-tips">
            欢迎来到
          </div>
          <el-form-item prop="username" style="margin-top: 40px">
            <el-input placeholder="请输入用户名" v-model="form.username" tabindex="1" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" tabindex="2" v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-button class="login-btn" type="primary" :loading="state.loading" @click="handleLogin(formRef)">
            登录
          </el-button>
        </el-form>
      </el-col>
      <el-col :lg="1" :md="1" :sm="24" :xl="1" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { reactive, ref } from 'vue';

import type { FormInstance, FormRules } from 'element-plus'
import { isPassword } from '@/utils/validate';

const formRef = ref<FormInstance>();
const { login, getToken } = useUserStore();


const $route = useRoute();

interface form {
  username: string,
  password: string
}

let state = reactive({
  loading: false
})

let form = reactive<form>({
  username: '123',
  password: '123456'
});

// 校验
const validateUsername = (rule: any, value: string, callback: any) => {
  if (value === '') callback(new Error('用户名不能为空'))
  else callback()
}
const validatePassword = (rule: any, value: string | any[], callback: any) => {
  if (!isPassword(value)) callback(new Error('密码不能少于6位'))
  else callback()
}
const rules = reactive<FormRules<typeof form>>({
  username: [
    {
      required: true,
      trigger: 'change',
      validator: validateUsername
    }
  ],
  password: [
    {
      required: true,
      trigger: 'change',
      validator: validatePassword
    }
  ],
})

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        state.loading = true
        await login({
          username: form.username,
          password: form.password
        })
        let redirect:any = $route.query.redirect;
        router.replace({
          path: redirect || '/'
        })
      }
      finally {
        state.loading = false
      }
    }
  })
}

</script>
<style scoped lang="scss">
.login-container {
  height: 100vh;
  background: url("images/login_images/background.png") center center fixed no-repeat;
  background-size: cover;
}

.login-form {
  position: relative;
  max-width: 100%;
  padding: 4.5vh;
  margin: calc((100vh - 475px) / 2) 5vw 5vw;
  overflow: hidden;
  background: url("images/login_images/login_form.png");
  background-size: 100% 100%;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: var(--el-color-white);
  }

  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: var(--el-color-white);
  }

  .login-btn {
    display: inherit;
    width: 220px;
    height: 50px;
    margin-top: 5px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }

    .forget-passwordword {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-password {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: $base-font-size-default;
    color: var(--el-color-white);

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: var(--el-color-primary);
      text-align: center;
    }
  }

  i {
    position: absolute;
    top: 14px;
    left: 0px;
    z-index: 1999;
    font-size: 18px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    right: 25px;
    left: -35px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  :deep() {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: $base-input-height;
        line-height: $base-input-height;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $base-font-size-small;
        line-height: 18px;
        color: var(--el-color-error);
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 48px;
        padding-left: 35px;
        font-size: $base-font-size-default;
        line-height: 58px;
        background: #f6f4fc;
        border: 0;
      }
    }

    .code {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
      border-radius: $base-border-radius;
    }
  }
}
</style>