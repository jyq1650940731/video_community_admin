import {
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus';

const $baseMessage = (message: string, type = 'info') => {
  ElMessage({});
};
