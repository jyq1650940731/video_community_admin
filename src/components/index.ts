//全局组件注册
import SvgIcon from './SvgIcon/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

type stringKey = Record<string, object>;
const allGlobalComponents: stringKey = { SvgIcon };

export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((item) => {
      app.component(item, allGlobalComponents[item]); //全局组件注册
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
