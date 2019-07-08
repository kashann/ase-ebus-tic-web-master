<template>
    <div>
        <h1>Add a new To Do</h1>
        <h2>INCA NU MERGE perfect, no persistance</h2>
        <div>
            <input v-model="title" placeholder="Title">
            <p>Title is: {{ title }}</p>
            <button v-on:click=addToDo(title.toString())>Add</button>
            <p>{{this.$parent.$data.toDos}}</p>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'toDos',
        props: ['toDos'],
        data(){
            return {
                title: ''
            };
        },
        methods: {
            addToDo: function(titleVar){
                var obj = {title: titleVar, status: false, id: Object.keys(this.$parent.$data.toDos).length};
                this.$parent.$data.toDos.push(obj);
            }
        }
    };
</script>

<style>
    
</style>