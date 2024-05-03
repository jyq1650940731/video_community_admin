<template>
    <div>
        <el-breadcrumb separator-icon="ArrowRightBold">
            <el-breadcrumb-item v-for="(item, index) in menuList" :key="index" v-show="item.meta.icon">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                {{ item.meta.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script lang='ts' setup>
defineProps(['menuList'])
</script>
<style lang='scss' scoped>
:deep() {
    .el-breadcrumb__inner {
        display: flex;

        .el-icon {
            margin-right: 2px;
        }
    }
}
</style>
