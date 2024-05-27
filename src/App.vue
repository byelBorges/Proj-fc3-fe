<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <form-login msg="Bem vindo ao AtivoOperante App"/> -->
  <router-view></router-view>
</template>

<script>
import FormLogin from './components/FormLogin.vue'

export default {
  name: 'App',
  components: {
    FormLogin
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
