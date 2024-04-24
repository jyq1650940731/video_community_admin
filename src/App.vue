<script setup lang="ts">
import {login} from '@/api/user'
login({username:"1234",password:"21345"});
</script>

<template>
  <router-view></router-view>
</template>

