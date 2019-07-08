<template>
  <div id="app">
    <navbar/>
    <img src="./assets/logo.png">
    <router-view/>
    <toDos :toDos='toDos'/>
    <completedToDos :toDos='toDos'/>
  </div>
</template>

<script>
import navbar from './components/navbar';
import toDos from './components/toDos';
import completedToDos from './components/completedToDos';
import customRouteParam from './components/customRouteParam';
export default {
  name: 'App',
  components: {
    navbar, //: navbar,
    toDos,
    completedToDos,
    customRouteParam
  },
  data(){
    return {
      toDos: [
          {title: "Learn JavaScript", status: true},
          {title: "Learn jQuery", status: true},
          {title: "Learn nodeJS", status: false},
          {title: "Learn express", status: false},
          {title: "Learn Sequelize", status: false}
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