import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import toDos from '@/components/toDos';
import newToDo from '@/components/newToDo';
import toDosParam from '@/components/toDosParam';

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
      path: '/todos',
      name: 'toDos',
      component: toDos
    },
    {
      path: '/todos/new',
      name: 'newToDo',
      component: newToDo
    },
    {
      path: '/todos/:parametru',
      name: 'toDosParam',
      component: toDosParam
    }
  ]
});
