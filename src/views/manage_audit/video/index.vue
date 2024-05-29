<!--
 * @Author: YourName
 * @Date: 2024-05-28 11:32:49
 * @LastEditTime: 2024-05-29 15:55:14
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_admin\src\views\manage_audit\video\index.vue
 * 版权声明
-->
<template>
  <div class="video_audit-container">
    <el-tabs
      v-model="activeName"
      class="video_audit-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="待审核" :name="0">
        <audit-table
          :auditTable="tableList[0]"
          :currentStatus="0"
          @updataPage="getVideoListByStatus"
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane label="已过审" :name="1">
        <audit-table
          :auditTable="tableList[1]"
          :currentStatus="1"
          @updataPage="getVideoListByStatus"
        ></audit-table>
      </el-tab-pane>
      <el-tab-pane label="未过审" :name="2">
        <audit-table
          :auditTable="tableList[2]"
          :currentStatus="2"
          @updataPage="getVideoListByStatus"
        ></audit-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { getVideoListByPage } from '@/api/video';
import type { videoAuditFormType, resTableData } from '@/types/api';
import { onMounted, reactive, ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import AuditTable from './components/AuditTable.vue';

const activeName = ref(0);
const isTabActived = reactive([
  { actived: true },
  { actived: false },
  { actived: false },
]);
const queryForm = reactive<videoAuditFormType>({
  status: 0,
  page: 1,
  size: 10,
});
const tableList = reactive<resTableData[]>([
  {
    total: 0,
    list: [],
  },
  {
    total: 0,
    list: [],
  },
  {
    total: 0,
    list: [],
  },
]);

onMounted(async () => {
  getVideoListByStatus(queryForm);
});

const handleClick = async (tab: TabsPaneContext, event: Event) => {
  const index = parseInt(tab.index as string);
  activeName.value = index;
  if (!isTabActived[index].actived) {
    isTabActived[index].actived = true;
    queryForm.status = index;
    getVideoListByStatus(queryForm);
  }
};

const getVideoListByStatus = async (queryForm: videoAuditFormType) => {
  const { result } = await getVideoListByPage(queryForm);
  tableList[activeName.value] = result;
};
</script>
<style lang="scss" scoped>
.video_audit-tabs {
  :deep() {
    .el-tabs__item.is-top:nth-child(2) {
      margin-left: 20px;
    }
    .el-pagination {
      position: fixed;
      bottom: 75px;
      z-index: 999;
      background: #fff;
      left: 0;
      left: 286px;
      right: 20px;
      padding: 20px 0;
      box-shadow: 0px -1px 4px rgba(0, 21, 41, 0.08);
    }
  }
}
.video_audit-container {
  overflow: auto;
  height: calc(100vh - 60px - 40px - 55px);
  padding-bottom: 90px !important;
}
</style>
