<template>
  <div class="video_detail-container">
    <div class="video-detail__layout">
      <div class="left">
        <div id="player" class="player">
          <video :src="state.video.videoUrl" controls></video>
        </div>
        <div class="v-card options">
          <div class="options-top">
            <div class="status" v-if="state.video.status === 0">
              <el-icon style="color: #e6a23c"><WarningFilled /></el-icon>
              <span>待审核</span>
            </div>
            <div class="status" v-if="state.video.status === 1">
              <el-icon style="color: #67c23a"><SuccessFilled /></el-icon>
              <span>已通过</span>
            </div>
            <div class="status" v-if="state.video.status === 2">
              <el-icon style="color: #f56c6c"><CircleCloseFilled /></el-icon>
              <span>未通过</span>
            </div>
            <div class="items">
              <el-button
                type="success"
                plain
                class="options-item pass"
                @click="updateVideoStatus(1)"
              >
                <el-icon v-if="state.isMiniWidth"><Select /></el-icon>
                <span v-else>通过审核</span>
              </el-button>
              <el-button
                type="warning"
                plain
                class="options-item no-pass"
                @click="updateVideoStatus(2)"
              >
                <el-icon v-if="state.isMiniWidth"><CloseBold /></el-icon>
                <span v-else>不予过审</span>
              </el-button>
              <el-button
                type="danger"
                plain
                class="options-item ban"
                @click="beforeDelete"
              >
                <el-icon v-if="state.isMiniWidth"><Delete /></el-icon>
                <span v-else>永久删除</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="detail">
        <div class="v-card detail-card">
          <div class="detail-item">
            <div class="item-title">标题</div>
            <div class="item-content">{{ state.video.title }}</div>
          </div>
          <div class="detail-item">
            <div class="item-title">类型</div>
            <div class="item-content">
              <span class="type" v-if="state.video.type === 1">自制</span>
              <span class="type" v-if="state.video.type === 2">转载</span>
              <div
                class="auth"
                v-if="state.video.type === 1 && state.video.auth === 1"
              >
                <i class="iconfont icon-jinzhi"></i>
                <span>未经授权 禁止转载</span>
              </div>
            </div>
          </div>
          <div class="detail-item">
            <div class="item-title">分区</div>
            <div class="item-content">
              {{ state.category.mcName }} &nbsp;→&nbsp;
              {{ state.category.scName }}
            </div>
          </div>
          <div class="detail-item">
            <div class="item-title">标签</div>
            <div class="item-content">
              <div
                class="tag-container"
                v-for="(item, index) in state.tags"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div class="detail-item">
            <div class="item-title">简介</div>
            <div class="item-content">
              <span class="v-text descr">{{ state.video.descr }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import  router  from '@/router';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import type { videoType, categoryType } from '@/types/api';
import { getVideoById, changeVideoStatus } from '@/api/video';
import { ElMessageBox } from 'element-plus';
const route = useRoute();

const state = reactive({
  video: {} as videoType, // 视频信息
  user: {}, // 投稿用户信息
  category: {} as categoryType, // 视频分区信息
  tags: [], // 投稿标签
  isMiniWidth: false, // 判断是否小窗
});

onMounted(async () => {
  getVideoDetail();
});
const getVideoDetail = async () => {
  const {
    result: { video, user, category },
  } = await getVideoById({ vid: route.params.vid });
  state.video = video;
  state.user = user;
  state.category = category;
  state.tags = video.tags.split('\r\n').filter((tag) => tag.trim() !== '');
};

const updateVideoStatus = async (status: number) => {
  await changeVideoStatus({
    vid: route.params.vid,
    status,
  });
  if (status != 3) {
    getVideoDetail();
    ElMessage.success('审核状态已更新！');
  } else {
    router.replace({
      path: '/manage_audit/video',
    });
  }
};
const beforeDelete = () => {
  ElMessageBox.confirm('是否确认删除原视频？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      updateVideoStatus(3);
    })
    .catch(() => {});
};
</script>
<style scoped>
.el-icon {
  vertical-align: text-bottom;
  margin-right: 3px;
  font-size: 16px;
}

.v-container {
  position: relative;
}

.video-detail__layout {
  position: relative;
  width: 100%;
  display: flex;
}

.left {
  width: 66%;
  max-width: 672px;
}

.player {
  box-shadow: 2px 2px 10px #0000003f;
  background-color: black;
  width: 100%;
}

.player video {
  width: 100%;
  height: 100%;
}

.options {
  margin-top: 16px;
}

.options-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
}

.status {
  display: flex;
  align-items: center;
}

.options-item {
  padding: 0 10px;
}

.detail {
  flex: 1;
  margin: 0 0 0 16px;
  min-width: 400px;
  color: var(--text2);
}

.detail-card {
  min-height: 425px;
  padding: 0 16px 30px 20px;
}

.detail-item {
  display: flex;
  margin-top: 20px;
  min-height: 25px;
}

.item-title {
  flex: 0 0 auto;
  width: 70px;
  color: var(--text1);
  font-size: 16px;
  font-weight: 600;
}

.item-content {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}

.type {
  flex: 0 0 auto;
  width: 45px;
}

.icon-jinzhi {
  font-size: 14px;
  color: var(--stress_red);
  margin-right: 4px;
}

.tag-container {
  text-align: center;
  padding: 0 12px;
  margin: 0px 12px 12px 0;
  height: 25px;
  border-radius: 14px;
  background: #f1f2f3;
  font-size: 12px;
  line-height: 25px;
  border: none;
}

.descr {
  width: 100%;
  min-height:170px;
  padding: 10px;
  background-color: #fafafa;
  border: 1px solid #eee;
  border-radius: 8px;
}

@media (max-width: 700px) {
  .video-detail__layout {
    flex-direction: column;
  }

  .left {
    width: auto;
  }

  .detail {
    margin: 16px 0 0 0;
    min-width: auto;
  }

  .item-title {
    width: 50px;
  }
}

@media (min-width: 700.1px) and (max-width: 800px) {
  .detail {
    min-width: 300px;
  }

  .item-title {
    width: 50px;
  }
}
</style>
