<template>
<div id="btnGetTest">
    <div v-for="user in users" :key="user.id">
        <p>Bonjour {{user.firstName}} {{user.lastName}}</p>
    </div>
    <p>{{error}}</p>
    <button id="btnGet" type="button" value="Récupérer quelquechose" @click="getThing">Récupérer quelquechose</button>
</div>    
</template>

<script>
export default {
    name: 'Test',
    data() {
        return{
            error: null,
            users: null,
            validation: null
        };
    },
    created() {
        this.getThing()
    },
    methods: {
        getThing: function() {
            this.error = 'pas derror';
            fetch('http://localhost:3000/api/test')
            .then(response => {
                const users = response.json()
                return users
            }) 
            .then(users => {
                this.users = users
                console.log(users)
            })
            
        }

    
    }
    }
</script>

<style>
#btnGetTest{
    height: 100%;
}
#btnGet {
    height: 100%;
}
</style>
