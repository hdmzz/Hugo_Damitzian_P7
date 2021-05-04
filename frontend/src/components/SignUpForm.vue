<template>
    <div id="container">
        <div id="inscriptionContainer">
            <div id="logo">
                <img src="../assets/logo/icon.svg" alt="logo de groupomania">
            </div>
            <nav class="navigation">
                <p>Déjà Inscrit ? <a href="/connexion">Connectez-vous</a></p>
            </nav>
            <form id="form" method="POST" @submit.prevent="sendData">
                    <div id="rowItem">
                        <div class="rowLigne">
                            <label for="prenom">Prénom :</label>
                            <input type="text" name="prenom" v-model="firstName" class="formControl" maxlength="25" required>
                        </div>
                        <div class="rowLigne">
                            <label for="nom">Nom :</label>
                            <input type="text" name="nom" v-model="lastName" class="formControl" maxlength="25" required>
                        </div>
                        <div class="rowLigne">
                            <label for="email">Adresse mail :</label>
                            <input type="email" name="email" v-model="email" class="formControl" required pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}">
                        </div>
                        <div class="rowLigne">
                            <label for="password">Mot de passe :</label>
                            <input type="password" name="password" v-model="password" class="formControl" maxlength="25" required>
                        </div>
                    </div>
                <input id="formButton" type="submit" value="S'inscrire" class="btnSend">
            </form>
        </div>
    </div>
</template>

<script>
import router from '../router/index';

export default {
    name: 'SignUpForm',
    data() {
        return{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async sendData() {
            await fetch('http://localhost:3000/api/users/',
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                })
            })
            .then(function (resp){
                if (resp.ok){
                    //Si la reponse a le statut ok, on envoie l'utilisateur sur la page de connexion
                    router.push("connexion")
                    return resp.text()
                } if (!resp.ok) {
                    console.log(resp)
                    alert(resp.status, resp.statusText) 
                }
            })
            .catch(error => console.log(error));
        }
    }
}
</script>

<style  lang="scss" scoped>
#container{
    display: flex;
    height: 100vh;
}
#inscriptionContainer{
    text-align: center;
    background-color: white;
    border-radius: 1rem;
    width: 50%;
    margin: auto;
    padding: 1rem;
}
#logo{
    img{
        height: 100%;
        width: 25%;
    }
}
#rowItem{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: fit-content;
    margin: auto;
}
.rowLigne{
    padding: 1vw;
}
//Responsive
@media screen and (max-width: 530px){
    #rowItem{
        display: block;
    }
}
</style>