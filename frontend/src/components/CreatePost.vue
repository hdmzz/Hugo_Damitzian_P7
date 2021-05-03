<template>
    <div id="postForm">
        <form action="POST" @submit.prevent="createPost" id="myForm">
            <div id="comments" class="postInput">
                <textarea type="text" id="comment" name="comment" v-model="comment" rows="2" placeholder="Créer un post"></textarea>
            </div>
            <div class="postInput">
                <label for="file" class="labelFile">Choisir une image</label>
                <input id="file" class="inputFile" type="file" ref="file" name="file" @change="onFileSelected">
            </div>
            <input type="submit" class="postInput" value="Publier!">
        </form>
        
    </div>
</template>

<script>
export default {
    name: "CreatePost",
    data() {
        return{
            comment: '',
            file: null
        }
    },
    methods: {
        onFileSelected(){
            const file = this.$refs.file.files[0]
            console.log(file)
            this.file = file
            console.log(this.file)
        },
        createPost(){
            console.log('create post running')
            const token = localStorage.getItem('token');
            console.log(token)
            const userId = localStorage.getItem('userId');
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('comment', this.comment);
            formData.append('file', this.file);
            fetch('http://localhost:3000/api/post/createPost', {
                method: "POST",
                headers: 
                {
                    authorization: 'Bearer ' + token
                },
                body: formData
            }).then(res => {
                if(res.status == 200){
                    this.$emit('postsent', {
                    message: 'nouveau post',
                })
                }
            }).catch(error => console.log(error));
            document.getElementById('file').value = null;
            document.getElementsByName('comment')[0].value = null;
            formData.delete('file')
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
#postForm{
    font-family: Poppins,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #ffffff;
    border-radius: 1rem;
    max-width: 100%;
    margin-top: 1rem;
    margin-right: auto;
    margin-left: auto;
    button{
        border-radius: 1rem;
        background-color: #f0e6e6;
    }
}
#myForm{
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
}
label {
    display: block;
    margin-bottom: 10px;
}
#comment{
    color: black;
    text-align: center;
}
.postInput{
    margin: 1rem;
    max-height: fit-content;
}
//css partie input 
.labelFile {
    cursor: pointer;
    color: #00b1ca;
    font-weight: bold;
}
.labelFile:hover {
    color: #25a5c4;
}

// et on masque le input
.inputFile{
    display: none;
}

</style>