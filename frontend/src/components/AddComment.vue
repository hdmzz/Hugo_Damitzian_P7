<template>
    <div id="addComment" @submit.prevent='addComment'>
        <form action="post">
            <input type="text" value="Commentaire" name="comInput" id="comInput" v-model="comment" required='true'>
            <input type="submit" placeholder="Ajouter un commentaire" id="sendBtn">
        </form>
    </div>
</template>
<script>
export default {
    name: 'AddComment',
    props: ['id'],
    data(){
        return{
            comment: null,
            token: null, 
            userId: null
        }
    },
    created(){
        this.getInfo()
        console.log('created addcomment')
    },
    methods:{
        async getInfo(){
            this.token = localStorage.getItem('token');
            this.userId = localStorage.getItem('userId');
        },
        async addComment(){
            console.log('ajouter commentaire')
            console.log(this.userId)
            await fetch("http://localhost:3000/api/comment/createComment",{
                method: "POST",
                headers: 
                {   
                    'Content-Type': 'application/json',
                    authorization : 'Bearer ' + this.token
                },
                body: JSON.stringify({
                    comment: this.comment,
                    userId: this.userId,
                    postId: this.$store.state.postId
                })
            }).then(response => {
                if(response.status == 401){
                    alert("Commentaire vide")
                }
                console.log(response)
                })
            .catch(err => {
                console.log(err)
            });
            this.comment = null
            this.$emit('commentsent', {
                    message: 'nouveau post',
                })
        }
    }
}
</script>
<style lang="scss" scoped>
#addComment{
    display: flex;
    text-align: center;
}
form{
    width: 100%;
}
#comInput{
    width: 70%;
    margin-right: 1rem;
}
#sendBtn{
    width: fit-content;
    border: none;
    background-color: dodgerblue;
    border-radius: 1rem;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    padding: 7px;
}
@media screen and (min-width: 200px) and (max-width: 900px) {
    #addComment{
        display: block;
    }
    #sendBtn{
        padding: 5px;
        margin-top: 5px;
    }
}
</style>