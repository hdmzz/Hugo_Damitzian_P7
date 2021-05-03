<template>
    <div id="onePost">
        <Header/>
        <div id="post">
            <div id="postContainer">
                <div id="card">
                    <div id="head">
                        <p>{{post.firstName}} {{post.lastName}} a écrit :</p>
                    </div>
                    <div id="body">
                        <p>{{post.comment}}</p>
                    </div>
                    <div v-if="post.imageurl">
                        <img :src="post.imageurl" alt="image du post">
                    </div>
                    <div id="comment">
                        <AddComment @commentsent="getComments"/>
                        <div id="commentSection">
                            <p v-if="data == ''">Pas encore de commentaires</p>
                            <div v-for="comment in data" :key="comment.commentId" id="comments">
                                <div id="head">
                                    <p>{{comment.firstName}} {{comment.lastName}} à écrit:</p>
                                </div>
                                <div>
                                    <p>{{comment.comment}}</p>
                                </div>
                                <button v-if="userId == comment.userId" @click="deleteComment(comment.commentId, $store.state.userCmtDlt)" class="deleteBtn"><i class="fas fa-trash-alt"></i></button>
                                <button v-if="isadmin == 1" @click="deleteComment(comment.commentId, $store.state.adminCmtDlt)" class="adminDelete">Modérer ce post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import Header from '../components/Header';
import AddComment from '../components/AddComment';
export default {
    name: 'PostVue',
    props: ['id'],
    components: {
        Header: Header,
        AddComment: AddComment
    },
    data(){
        return{
            post: {},
            data: null,
            token: null,
            userId: null
        }
    },
    created(){
        this.isadmin = localStorage.getItem('isadmin');
        this.userId = localStorage.getItem('userId')
        this.token = localStorage.getItem('token');
        this.userId = localStorage.getItem('userId');
        this.$store.state.postId = this.id;   
        this.getPost(this.id) 
        this.getComments()
    },
    methods: {
        async getPost(id) {
            console.log('getPosts')
            //envoyer une requête pour récupérer les posts avec le bearer token
            fetch("http://localhost:3000/api/post/getOnePost/"+ id,
            {
                headers: 
                {
                    authorization : 'Bearer ' + this.token
                }
            }).then(response => {
                const data = response.json();
                return data
            }).then(data => {
                this.post = data.result[0]
            })
            .catch(error => {
                console.log(error)
            })
        },
        async getComments(){
            console.log('getComments running')
            await fetch('http://localhost:3000/api/comment/getComments/' + this.id, {
                headers: {
                    authorization: 'Bearer ' + this.token
                }
            })
            .then(res => res.json())
            .then(data => this.data = data.result)
            .catch(error => console.log(error));
        },
        async deleteComment(commentId, url){
            console.log('delete comment' + ' '+ (commentId))
            console.log(url)
            await fetch(url + commentId, 
            {
                method: 'delete',
                headers: {
                    authorization : 'Bearer ' + this.token
                }
            })
            .then(res => {
                return res
                })
            .then(res => {
                if (res.status == 401){
                    alert('Vous ne pouvez pas supprimer ce post')
                }
                if(res.status == 200){
                    this.getComments()
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#onePost{
    width: 100%;
}
#post{
    margin: 2rem;
}
#postContainer{
    width: 50%;
    margin-right: auto;
    margin-left: auto;
}
#card{
    padding: 1rem;
    background-color: white;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 1rem;
    box-shadow: 0px 0px 10px rgb(110, 107, 107);
    img{
        max-height: 50%;
        max-width: 100%;
    }
}
#addComment{
    padding: 1rem;
}
button{
    width: fit-content; 
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
#comment{
    padding: 1rem;
    background-color: #F8F8FF;
}
#commentSection{
    background-color: #eeeeee;
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem;
    #comments{
        background-color: white;
        border-radius: 1rem;
        padding: 1rem;
        margin: 10px;
    }
}

//responsive
@media screen and (min-width: 200px) and (max-width: 900px) {
    #postContainer{
        width: 90%;
    }
    #card{
        border-radius: 0;
    }
    #comment{
        text-align: center;
    }
}
</style>
