<template>
    <svg style="width: 30; height: 30">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </template>
  <script lang="ts" setup>
  defineProps({
    prefix: {
      type: String,
      default: '#icon-',
    },
    name: {
      type:String,
      required:true
    },
    color: String,
  });
  </script>
  <style lang="less" scoped></style>
  