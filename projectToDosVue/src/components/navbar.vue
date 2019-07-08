<template>
    <div class="navbar">
        <ul>
            <li v-for="(link, index) in links" :key="index"><a :href="'/' + link.url">{{ link.name }}</a></li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                links: [
                    {name: 'Home', id: 1, url: ''},
                    {name: 'To Dos', id: 2, url: 'todos'},
                    {name: 'Add To Do', id: 3, url: 'todos/new'},
                    // {name: 'Search To Do', id: 4, url: 'todos/new'}
                ]
            };
        }
    };
</script>

<style scoped>
    li{
        list-style-type: none;
        margin: 20px;
        display: inline-block;
    }
</style>