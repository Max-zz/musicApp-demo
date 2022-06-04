import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { Tabbar, Search ,TabbarItem,NavBar,Col,Row,Image as VanImage,Cell, CellGroup, Icon,List    } from 'vant';
import {recommendMusicAPI} from '@/api';
// async function func(){
//     const res = await recommendMusicAPI();
//     console.log('res: ', res);
// };
// func();
{
Vue.use(VanImage);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);

}


Vue.config.productionTip = false

new Vue({
  router, //引入路由
  render: h => h(App),
}).$mount('#app')
