<template><h1><el-button
    class="login-btn"
    type="primary"
  >
    登录
  </el-button></h1></template>
<script lang='ts' setup>
import {getMenu} from '@/api/router';
getMenu();
</script>
<style lang='scss' scoped>

</style>
