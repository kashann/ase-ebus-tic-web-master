<template>
    <div class="to-dos">
        <h1>ToDos</h1>
        <!--<div v-for="(toDo, index) in toDos" :key="index">{{toDo.title}}</div>-->
        <ul>
            <li v-for="(toDo, index) in toDos" :key="index"><a href="">{{toDo.title}}</a></li>
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'toDos',
        props: ['toDos'],
        data(){
            return {
                
            };
        }
    };
</script>

<style>
    
</style>