//全局组件注册
import SvgIcon from './SvgIcon/index.vue';

type stringKey = Record<string, object>;
const allGlobalComponents:stringKey = { SvgIcon };

export default {
  install(app:any) {
    Object.keys(allGlobalComponents).forEach((item) => {
      app.component(item, allGlobalComponents[item]); //全局组件注册
    });
  },
};
