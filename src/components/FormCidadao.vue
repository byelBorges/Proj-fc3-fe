<template>
  <div v-if="usuarioAutenticado" class="container">
    <p><a href="/login">Home</a></p>
    <h1>Módulo do Cidadão</h1>
    <div class="divFormDenuncia">
      <form @submit.prevent="enviarDenuncia()">
        <label for="titulo"></label>
        <input id="titulo" v-model="titulo" type="text">

        <label for="texto"></label>
        <input id="texto" v-model="texto" type="text">

        <label for="urgencia"></label>
        <input id="urgencia" v-model="urgencia" type="text">

        
        <select v-model="this.orgaoSelecionado">
          <!--<option v-for="orgao in this.listaOrgaos" :value="orgao.id">{{ orgao.nome }}</option>-->
        </select>

        <label for="data"></label>
        <input id="data" v-model="data" type="text">

        <label for="tipo"></label>
        <input id="tipo" v-model="tipo" type="text">
        <!-- Lembrar de enviar o cidadao logado tambem -->
      </form>
    </div>

    <div class="divListaDenuncias">

    </div>

    <div class="opcoes">
      <h3>Opções para visualizar as denúncias enviadas pelo Cidadão logado</h3>
      <h3>Formulário para enviar uma nova denúncia</h3>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  
  name: 'FormCidadao',
  data() {
    return {
      usuarioAutenticado: false,
      listaOrgaos: [],
      listaTipos: [],
      listaDenunciasCidadaoLogado: [],
      titulo: '', texto: '', urgencia:'', orgaoSelecionado: '', data: '', tipo: '',
      urlBase: 'http://localhost:8080/apis/cidadao'
    };
  },
  beforeMount() {
    const token = localStorage.getItem("token");
    if (token != null) {
      this.usuarioAutenticado = true;
    } else {
      window.location.replace("/login");
    }
  },
  mounted() {
    //buscar Orgaos, tipos
    //buscar Denuncias desse cidadao logado
    this.buscaOrgaos();
  },
  methods: {
    buscaOrgaos() {
      let token = localStorage.getItem('token');
      axios.get(`http://localhost:8080/apis/cidadao/get-all-orgaos`,{
        headers:{
          'Authorization': token
        }
      })
        .then(resposta => {
          this.listaOrgaos = resposta.data;
        })
        .catch(erro =>{
          this.listaOrgaos= [];
          console.log(erro);
        })
    },
    buscaTipos() {

    },
    buscaDenunciasCidadaoLogado() {

    }
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.divFormDenuncia {
  margin-bottom: 20px;
}

.opcoes {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}
</style>
