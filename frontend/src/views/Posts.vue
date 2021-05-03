<template>
    <div id="feed">
        <Header/>
        <Posts/>
    </div>
</template>

<script>
import Header from '../components/Header';
import Posts from '../components/Posts';

export default {
    name: 'PostsVue',
    components: {
        Header: Header,
        Posts: Posts
    }
}
</script>
<style lang="scss" scoped>
#feed{
    padding-bottom: 2rem;
}
</style>