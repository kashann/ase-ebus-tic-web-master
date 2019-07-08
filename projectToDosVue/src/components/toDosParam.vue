<template>
    <div class="param">
        <h1>problema in if</h1>
        <p>To Do item with id <strong>{{parametru}}</strong> is:</p>
        <div v-for="(toDo, id) in toDos" :key="id" >
            <div v-if='parametru==toDo.id'>
            <strong>{{toDo.title}}</strong><br>
            <button>Edit</button>
            <button>Delete</button>
            </div>
        </div>
        <!--<div v-else>NOT found! :(</div>-->
        <!--<div v-if="!toDos">NOT found! :(</div>-->
    </div>
</template>

<script>
    export default{
        data(){
            return {
                parametru: this.$route.params.parametru,
                toDos: this.$parent.$data.toDos,
                notFound: true,
                index: -1
            };
        },
        methods: {
            verify: function(id){
                if(id.toString() === this.$route.params.parametru){
                    this.$data.notFound = false;
                    return true;
                }
                else {
                    this.$data.notFound = true;
                    return false;
                }
            }, 
            isNotFound: function(){
                if(this.notFound === true)
                    return true;
                else return false;
            }
        },
        // computed: {
        //   toDosFound: function () {
        //     for(var i = 0; i < this.$data.toDos.length; i++){
        //         if(this.$data.toDos[i].id == this.parametru)
        //             return this.$data.toDos[i];
        //     }
        //   }
        // }
    };
</script>

<style>
    
</style>