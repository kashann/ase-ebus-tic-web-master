<template>
    <div class="param">
        <p>Mesaj din customRoute cu parametrul dinamic <strong>{{parametru}}</strong></p>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                parametru: this.$route.params.parametru
            };
        }
    };
</script>

<style>
    
</style>