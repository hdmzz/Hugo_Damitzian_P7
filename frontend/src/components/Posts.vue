<template>
    <div id="container">
        <div id="posts">
            <div id="postsContainer">
                <div class="card">
                    <CreatePost @postsent="getPosts"/>
                </div>
                <div v-if="posts==''" id="emptyPosts">
                    <p>Pas encore de post</p>
                </div>
                <div v-for="post in posts" :key="post.post_id" class="card">
                        <div id="head"><p>{{post.firstName}} {{post.lastName}} a écrit :</p></div>
                        <router-link :to="{name: 'post', params: {id: post.post_id}}">
                            <div id="body"><p>{{post.comment}}</p></div>
                            <div v-if="post.imageurl">
                                <img :src="post.imageurl" alt="image du post">
                            </div>
                        </router-link>
                    <button v-if="userId == post.id" @click="deletePost(post.post_id, userDltRoute)" class="deleteBtn"><i class="fas fa-trash-alt"></i></button>
                    <button v-if="isadmin == 1" @click="deletePost(post.post_id, adminDltRoute)" class="adminDelete">Modérer ce post</button>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import CreatePost from './CreatePost';
export default {
    name: 'posts',
    components: {
        CreatePost: CreatePost
    },
    data(){
        return{
            posts: [],
            userId: null,
            isadmin: 0,
            error: '',
            adminDltRoute: 'http://localhost:3000/api/admin/',
            userDltRoute: 'http://localhost:3000/api/post/',
            token: ''
        }
    },
    created(){
        console.log('created')
        this.token = localStorage.getItem('token');
        this.userId = localStorage.getItem('userId');
        this.isadmin = localStorage.getItem('isadmin');
        this.getPosts();       
    },
    methods: {
        getPosts() {
            //envoyer une requête pour récupérer les posts avec le bearer token
            fetch("http://localhost:3000/api/post/getPosts",
            {
                headers: 
                {
                    authorization : 'Bearer ' + this.token
                }
            }).then(response => {
                if(response.status == 403){
                    alert("Vous êtes connecté depuis plus de 8 heures, vous devez vous reconnecter")
                }
                const data = response.json();
                return data
            }).then(data => {
                this.posts = data
            })
        },
        deletePost(id, url) {
            console.log(this.token+'deletepost');
            fetch(url + id, {
                method: 'delete',
                headers: {
                    authorization : 'Bearer ' + this.token
                }
            }).then(res => {
                return res
            }).then(res => {
                if (res.status == 401){
                    alert('Vous ne pouvez pas supprimer ce post')
                }
                if(res.status == 200){
                document.location.reload();
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
#titleForum{
    width: 40%;
    margin-left: auto;
    margin-right: auto;
}
a{
    text-decoration: none;
    color: black;
}
h1{
    font-family: 'Poppins';
}

#postsContainer{
    width: 40%;
    margin-right: auto;
    margin-left: auto;
}
#emptyPosts{
    text-align: center;
    margin-top: 20vh;
}
#container{
    width: 100%;
}

.card{
    padding: 1rem;
    background-color: white;
    box-shadow: 0px 0px 10px rgb(110, 107, 107);
    margin-top: 20px;
    border-radius: 1rem;
    img{
        max-height: 50%;
        max-width: 100%;
    }
}
#head, #body{
    text-align: start;
}

#head{
    font-family: franklin Gothic, Arial Bold
}
.adminDelete{
    background-color:crimson;
    color: whitesmoke;
}
.deleteBtn{
    width: fit-content;
}

//responsive
@media screen and (min-width: 200px) and (max-width: 900px) {
    #postsContainer{
        width: 90%;
    }
    .card{
        border-radius: 0;
    }
}
</style>