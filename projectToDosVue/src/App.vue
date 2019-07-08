<template>
  <div id="app">
    <navbar/>
    <img src="./assets/logo.png">
    <router-view/>
    <toDos :toDos='toDos'/>
  </div>
</template>

<script>
import navbar from './components/navbar';
import toDos from './components/toDos';
import toDosParam from './components/toDosParam';
import newToDo from './components/newToDo';
export default {
  name: 'App',
  components: {
    navbar,
    newToDo,
    toDosParam,
    toDos
  },
  data(){
     return {
      toDos: [
          {title: "Learn JavaScript", status: true, id: 0},
          {title: "Learn jQuery", status: true, id: 1},
          {title: "Learn nodeJS", status: false, id: 2},
          {title: "Learn express", status: false, id: 3},
          {title: "Learn Sequelize", status: false, id: 4}
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
