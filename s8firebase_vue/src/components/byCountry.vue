<template>
    <div class="byCountry">
        <h1>Esti in byCountry</h1>
        <input type="text" v-model="country" placeholder="introduceti tara"/>
        <button @click="getUserByCountry(country, dataSet)">Afiseaza rezultate</button>
        <h2 v-if="country">Rezultatele cautarii pentru tara {{ country }}</h2>
        <div v-for="dataRow in dataSet" :key="index">
            Preunme: {{ dataRow.firstName }}
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit';
    var ref = db.ref("users");
    
    export default {
        data() {
            return {
                country: '',
                dataSet: []
            };
        },
        methods: {
            getUserByCountry(country, dataSet){
                ref.orderByChild("address/country").equalTo(country).once('value').then(function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();
                        dataSet.push(childData);
                    });
                });
            }
        }
    };
</script>

<style>
    
</style>