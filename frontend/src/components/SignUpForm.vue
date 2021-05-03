<template>
    <div id="container">
        <div id="inscriptionContainer">
            <div id="logo">
                <img src="../assets/logo/icon.svg" alt="logo de groupomania">
            </div>
            <nav class="navigation">
                <p>Déjà Inscrit ? <a href="/connexion">Connectez-vous</a></p>
            </nav>
            <form id="form" class="m-4" method="POST" @submit.prevent="sendData">
                <div class="form-row">
                    <div id="rowItem">
                        <div class="rowLign">
                            <label for="prenom">Prénom :</label>
                            <input type="text" name="prénom" v-model="firstName" class="form-control" required>
                        </div>
                        <div class="rowLign">
                            <label for="nom">Nom :</label>
                            <input type="text" name="nom" v-model="lastName" class="form-control" required>
                        </div>
                    </div>
                    <div class="ligneForm">
                        <label for="email">Adresse mail :</label>
                        <input type="email" name="email" v-model="email" class="form-control" required pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}">
                    </div>
                    <div class="ligneForm">
                        <label for="password">Mot de passe :</label>
                        <input type="password" name="password" v-model="password" class="form-control" required>
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
        sendData() {
            fetch('http://localhost:3000/api/users/',
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
    justify-content: center;
}
.rowLign{
    padding: 1vw;
}
.ligneForm{
    padding-bottom:1vw ; 
}
</style>