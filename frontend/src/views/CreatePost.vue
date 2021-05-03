<template>
    <div id="createPost">
        <Header/>
        <CreatePost/>
    </div>

</template>

<script>
import Header from '../components/Header';
import CreatePost from '../components/CreatePost';

export default {
    name: "CreatePostVue",
    components: {
        Header: Header,
        CreatePost: CreatePost,
    }
}
</script>
<style lang="scss" scoped>
    
</style>