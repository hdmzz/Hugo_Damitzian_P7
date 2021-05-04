<template>
    <header>
        <div class="main">
            <div id="return">
                <router-link to="/posts">Forum</router-link>
                <router-link to="/account">Mon compte</router-link>
            </div>
            <div id="logo">
                <img src="../assets/logo/icon.svg" alt="logo de groupomania" id="logo">
            </div>
            <div id="logout">
                <button class="menu" @click="logout" id="btnLg">Déconnexion</button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    mounted(){
        this.logoutButton()
    },
    methods: {
        logoutButton(){
            const token = localStorage.getItem('token');
            if(token == null){
                document.getElementById('logout').style.display = 'none';
            }
        },
        logout(){
            localStorage.clear();
            document.location.reload();
        }
    }
};
</script>
<style lang="scss" scoped>
.main{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    box-shadow: 0px 0px 10px rgb(110, 107, 107);
    height: fit-content;
}

#logo{
    width: 25vw;
    height: fit-content;
}
.menu{
    margin: 0.5rem;
    text-decoration: none;
}

a{
    text-decoration: none;
    color: black;
    margin: 1rem;
}
.router-link-active{
    font-weight: bold;
    color: blueviolet;
}
button{
    width: fit-content;
    border: none;
    background-color: dodgerblue;
    border-radius: 1rem;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    padding: 1rem;
}
// responsive
@media screen and (min-width: 200px) and (max-width: 700px) {
    button{
        padding: 7px;
    }
    #return{
        order: 1;
    }
    #logo{
        width: auto;
    }
    #logout{
        order: 1;
    }
    .main{
        flex-direction: row;
    }
}
</style>