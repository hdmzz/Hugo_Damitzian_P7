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
            data: [],
            token:'',
            userId: ''
        }
    },
    created(){
        this.token = localStorage.getItem('token');
        this.userId = localStorage.getItem('userId');
        this.getAccountInfo();
    },
    methods: {
        async getAccountInfo(){ 
            await fetch("http://localhost:3000/api/account/" + this.userId, {
                headers: 
                {
                    authorization : 'Bearer ' + this.token
                }
            })
            .then(res =>{
                return res.json()
            })
            .then(res => this.data = res.result[0])
            .catch(error => console.log(error))// si il y a une erreur on l'affiche dans la console
        },
        async deleteUser(id){
            await fetch("http://localhost:3000/api/account/" + id, {
                method: 'delete',
                headers: {
                    authorization : 'Bearer ' + this.token
                }
            })
            .then(res => {
                if(res.status == 200){
                    //deconnexion , plus de token 
                    localStorage.clear()
                    alert('Compte supprimé')
                    router.push('/')
                }
            })
            .catch(error => console.log(error))// si il y a une erreur on l'affiche dans la console
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