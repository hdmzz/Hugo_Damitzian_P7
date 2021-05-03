<template>
    <div class="inscription">
        <SignUpForm/>
    </div>
</template>

<script>
import SignUpForm from '../components/SignUpForm';

export default {
    name: 'inscription',
    components: {
        SignUpForm: SignUpForm,
    }
}
</script>
