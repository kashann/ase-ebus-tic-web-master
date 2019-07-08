<template>
    <div class="to-dos">
        <h1>Completed ToDos</h1>
        <!--<div v-for="(toDo, index) in toDos" :key="index">-->
        <!--    <span v-if="toDo.status">{{toDo.title}}</span>-->
        <!--</div>-->
        <ul>
            <li v-for="(toDo, index) in toDos" v-if="toDo.status" :key="index"><a>{{toDo.title}}</a></li>
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'completedToDos',
        props: ['toDos'],
        data(){
            return {
                
            };
        }
    };
</script>

<style>
    
</style>