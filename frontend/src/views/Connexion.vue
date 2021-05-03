<template>
    <div id="connection">
        <Connection/> 
    </div>
</template>

<script>
import connect from '../components/Connexion';

export default {
    name: 'connectionVue',
    components: {
        Connection: connect,
    }
}
</script>