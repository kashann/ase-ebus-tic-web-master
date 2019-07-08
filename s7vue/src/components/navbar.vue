<template>
    <div class="navbar">
        <ul>
            <li v-for="(link, index) in links" :key="index"><a href="">{{ link.name }}</a></li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                links: [
                    {name: 'home', id: 1},
                    {name: 'about', id: 2},
                    {name: 'contact', id: 3},
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