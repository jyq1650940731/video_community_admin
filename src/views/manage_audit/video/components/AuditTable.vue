<!--
 * @Author: YourName
 * @Date: 2024-05-28 15:38:01
 * @LastEditTime: 2024-05-29 15:15:18
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_admin\src\views\manage_audit\video\components\AuditTable.vue
 * 版权声明
-->
<template>
  <el-table v-loading="listLoading" :data="props.auditTable.list" border>
    <el-table-column align="center" width="100" label="vid" prop="video.vid">
      <template #default="{ row }">#{{ row.video.vid }}</template>
    </el-table-column>

    <el-table-column align="center" label="封面">
      <template #default="{ row }">
        <el-image
          style="width: 120px; height: 70px"
          :src="row.video.coverUrl"
          fits="scale-down"
        />
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      width="220"
      label="标题"
      prop="video.title"
      :show-overflow-tooltip="true"
    ></el-table-column>
    <el-table-column align="center" label="投稿用户" prop="user.nickname" />
    <el-table-column align="center" label="分区">
      <template #default="{ row }">
        <div>
          <el-tag type="primary">{{ row.category.mcName }}</el-tag>
          →
          <el-tag type="success">{{ row.category.scName }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="投稿时间"
      prop="video.uploadDate"
    ></el-table-column>
    <el-table-column align="center" label="状态">
      <template #default="{ row }">
        <div class="status" v-if="row.video.status === 0">
          <el-icon style="color: #e6a23c"><WarningFilled /></el-icon>
          <span>待审核</span>
        </div>
        <div class="status" v-if="row.video.status === 1">
          <el-icon style="color: #67c23a"><SuccessFilled /></el-icon>
          <span>已通过</span>
        </div>
        <div class="status" v-if="row.video.status === 2">
          <el-icon style="color: #f56c6c"><CircleCloseFilled /></el-icon>
          <span>未通过</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center">
      <template #default="{ row }">
        <router-link
          :to="'/manage_audit/detail/videoDetail/' + row.video.vid"
          target="_blank"
        >
          详情
        </router-link>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :background="true"
    v-model:current-page="queryForm.page"
    :layout="layout"
    v-model:page-size="queryForm.size"
    :total="auditTable.total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>
<script lang="ts" setup>
import type { resTableData, videoAuditFormType } from '@/types/api';
import { onMounted, reactive, ref } from 'vue';
const props = withDefaults(
  defineProps<{ auditTable: resTableData; currentStatus: number }>(),
  {
    auditTable: {
      list: [],
      total: 0,
    },
    currentStatus: 0,
  },
);
const emit = defineEmits(['updataPage']);
const layout = 'total, sizes, prev, pager, next, jumper';
const queryForm = reactive<videoAuditFormType>({
  status: props.currentStatus,
  page: 1,
  size: 10,
});
const listLoading = ref(false);
const handleSizeChange = (val: number) => {
    queryForm.size = val
    emit('updataPage',queryForm);
}
const handleCurrentChange = (val: number) => {
    queryForm.page = val
    emit('updataPage',queryForm);
}
</script>
<style lang="scss" scoped>
.el-icon {
  vertical-align: text-bottom;
  margin-right: 3px;
  font-size: 16px;
}
.el-tag {
  margin: 0 !important;
}
</style>
