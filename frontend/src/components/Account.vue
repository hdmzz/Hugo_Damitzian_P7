<template>
        <div id="container">
            <div id="title">
                <h1>Information du compte</h1>
            </div>
            <div id="infoCompte">
                <div id="nom">
                    <p>Nom: {{data.lastName}}</p>
                </div>
                <div id="prenom">
                    <p>Prénom: {{data.firstName}}</p>
                </div>
                <div id="email">
                    <p>Adresse mail : {{data.email}}</p>
                </div>
                <div id="deleteBtn">
                    <button @click="deleteUser(data.id)">Supprimer le compte</button>
                </div>
            </div>
        </div>
</template>
<script>
import router from '../router';
export default {
    name: 'Account',
    data(){
        return{
            data: []
        }
    },
    created(){
        this.getAccountInfo();
    },
    methods: {
        getAccountInfo(){
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            console.log("getaccount info");
            fetch("http://localhost:3000/api/account/" + userId, {
                headers: 
                {
                    authorization : 'Bearer ' + token
                }
            })
            .then(res =>{
                return res.json()
            }).then(res => this.data = res.result[0])
        },
        deleteUser(id){
            console.log(id);
            const token = localStorage.getItem('token');
            console.log(token);
            fetch("http://localhost:3000/api/account/" + id, {
                method: 'delete',
                headers: {
                    authorization : 'Bearer ' + token
                }
            }).then(res => {
                if(res.status == 200){
                    //deconnexion , plus de token , plus
                    localStorage.clear()
                    alert('Compte supprimé')
                    router.push('/')
                }
            }).then(console.log('res'))
        }
    }
}
</script>
<style scoped>
#container{
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 15vh;
    box-shadow: 0px 0px 10px rgb(110, 107, 107);
}
#title, #infoCompte{
    background-color: white;
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
    border-radius: 1rem;
}
@media screen and (min-width: 200px) and (max-width: 900px) {
    #container{
        width: 90%;
    }
}
</style>