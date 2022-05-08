import ComponentDemo from './utils/ComponentDemo.vue';
import ComponentDemos from './utils/ComponentDemos';
import './styles/demo.css';
import 'vfonts/Inter.css';
import 'vfonts/FiraCode.css';

export function initial(app) {
  app.component('ComponentDemo', ComponentDemo);
  app.component('ComponentDemos', ComponentDemos);
  <!--INSTALL_COMPONENTS_SLOT-->
}
