<template>
    <div id="container">
        <div id="connexionContainer">
            <div id="logo">
                <img src="../assets/logo/icon.svg" alt="logo de groupomania">
            </div>
            <p>Pas encore inscrit ? <a href="/">Inscrivez-vous</a></p>
            <form id="form" class="m-4" method="POST" @submit.prevent="connexion">
                <div class="form-row">
                    <div class="ligneForm">
                        <label for="email">Adresse mail :</label>
                        <input type="email" name="email" v-model="email" class="form-control" required>
                    </div>
                    <div class="ligneForm">
                        <label for="password">Mot de passe :</label>
                        <input type="password" name="password" v-model="password" class="form-control" required>
                    </div>
                </div>
                <input id="formButton" type="submit" value="Connexion" class="btnSend">
            </form>
            <p v-if="error">{{error}}</p>
        </div>
    </div>
</template>
<script>
import router from '../router/index'; 
export default {
    name: 'connect',
    data() {
        return{
            error: null,
            result: null,
            email:'',
            password:''
        };
    },
    methods: {
        connexion() {
            fetch("http://localhost:3000/api/users/connexion",{
                method: 'POST',
                headers: 
                {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            })
            .then(response => {
                if(response.status == 401){
                    this.error = "mot de passe incorrect" + response.statusText
                }
                const result = response.json()
                return result
            }) 
            .then(result => {
                this.result = result
                console.log(result.token)
                if(result.token == undefined){
                    alert('email ou mot de passe incorect');
                } else {
                localStorage.setItem('token', result.token)
                localStorage.setItem('userId', result.userId)
                localStorage.setItem('isadmin', result.isadmin)
                router.push('/posts')
                }
            }) 
            .catch(error => console.log(error));
        }
    }
}
</script>

<style lang="scss" scoped>
#container{
    display: flex;
    height: 100vh;
}
.ligneForm{
    margin: 1rem;
}
#logo{
    img{
        height: 100%;
        width: 25%;
    }
}

#connexionContainer{
    text-align: center;
    background-color: white;
    width: 50%;
    margin: auto;
    }
</style>