<template>
    <div id="account">
        <Header/>
        <Account/> 
    </div>
</template>

<script>
import Header from '../components/Header';
import Account from '../components/Account';

export default {
    name: 'AccountVue',
    components: {
        Header: Header,
        Account: Account,
    }
}
</script>