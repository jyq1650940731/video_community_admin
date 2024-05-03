<template>
    <template v-for="(item) in  menuList " :key="item.path">
        <!-- 无子路由 -->
        <template v-if="!item.meta.hidden">
            <template v-if="!item.children">
                <el-menu-item :index="item.path" @click="goPath">
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span :title="item.meta.title">{{ item.meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <template v-if="item.children && item.children.length === 1">
                <el-menu-item @click="goPath" :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
                    <el-icon>
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span :title="item.children[0].meta.title">{{ item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span :title="item.meta.title">{{ item.meta.title }}</span>
                </template>
                <layout-menu :menuList="item.children"></layout-menu>
            </el-sub-menu>
        </template>
    </template>
</template>
<script lang="ts">
export default {
    name: 'layoutMenu'
}
</script>
<script lang='ts' setup>
import router from '@/router';

defineProps(['menuList']);
const goPath = (ev: any) => {
    router.push(ev.index);
}
</script>

<style lang='scss' scoped></style>
