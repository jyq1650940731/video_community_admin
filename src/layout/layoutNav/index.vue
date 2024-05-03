<template>
    <div class="vab-nav">
        <el-row :gutter="15">
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="4">
                <div class="left-panel">
                    <el-icon class="fold-unfold" @click="userStore.collapseChange">
                        <component :is="userStore.isCollapse ? 'Fold' : 'Expand'"></component>
                    </el-icon>
                    <breadcrumb :menuList="$route.matched"></breadcrumb>
                </div>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="20">
                <div class="right-panel">
                    <el-icon class="ri-refresh-line" @click="fullScreen">
                        <FullScreen />
                    </el-icon>
                    <el-icon class="ri-refresh-line">
                        <RefreshLeft />
                    </el-icon>
                    <el-icon class="ri-refresh-line">
                        <Setting />
                    </el-icon>
                    <el-dropdown>
                        <div class="avatar-dropdown">
                            <el-avatar class="ri-avatar" :src="userStore.avatar" />
                            <div class="user-name">
                                <span style="margin-right: 2px;">{{ userStore.username }}</span>
                                <el-icon>
                                    <ArrowDown />
                                </el-icon>
                            </div>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>Action 2</el-dropdown-item>
                                <el-dropdown-item @click="logout">
                                    <el-icon>
                                        <Remove />
                                    </el-icon>
                                    退出登录
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script lang='ts' setup>
import breadcrumb from './breadcrumb/index.vue';
import { useUserStore } from '@/stores/modules/user';

const userStore = useUserStore();

const fullScreen = () => {
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

const logout = () => {
    userStore.userLogout();
}
</script>
<style lang='scss' scoped>
.left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: $base-nav-height;

    :deep() {
        .fold-unfold {
            cursor: pointer;
            font-size: $base-font-size-bigger;
            margin-right: 20px;
        }
    }
}


.right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-height;

    :deep() {
        [class*='ri-'] {
            margin-left: $base-margin;
            color: var(--el-color-grey);
            cursor: pointer;
            font-size: $base-font-size-bigger;
        }

        .avatar-dropdown {
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
            justify-items: center;

            .user-name {
                position: relative;
                display: flex;
                align-content: center;
                align-items: center;
                height: 40px;
                margin-left: 6px;
                line-height: 40px;
                cursor: pointer;
            }
        }
    }
}
</style>
