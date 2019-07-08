import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import customRoute from '@/components/customRoute';
import customRouteParam from '@/components/customRouteParam';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/customRoute',
      name: 'customRoute',
      component: customRoute
    },
    {
      path: '/customRoute/:parametru',
      name: 'customRouteParam',
      component: customRouteParam
    }
  ]
});