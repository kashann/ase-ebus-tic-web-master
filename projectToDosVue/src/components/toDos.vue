<template>
    <div class="to-dos">
        <h1>To Dos</h1>
        <ul>
            <li v-for="(toDo, id) in toDos" :key="toDo.id"><a :href="'/todos/' + toDo.id">{{toDo.title}}</a></li>
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