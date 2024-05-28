<template>
  <div v-if="usuarioAutenticado" class="container">
    <p><a href="/login">Home</a></p>
    <h1>Módulo do Cidadão</h1>
    <div class="form-denuncia">
      <form @submit.prevent="enviarDenuncia()">
        <div class="form-group">
          <label for="titulo">Título:</label>
          <input id="titulo" v-model="titulo" type="text">
        </div>

        <div class="form-group">
          <label for="texto">Texto:</label>
          <textarea class="texto" name="texto" rows="4" cols="50" v-model="texto"></textarea>
        </div>

        <div class="form-group">
          <label for="urgencia">Urgência:</label>
          <input id="urgencia" v-model="urgencia" type="text">
        </div>

        <div class="form-group">
          <label for="orgao">Órgão:</label>
          <select v-model="orgaoSelecionado">
            <option v-for="orgao in listaOrgaos" :value="orgao.id">{{ orgao.nome }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="data">Data:</label>
          <input id="data" v-model="data" type="date">
        </div>

        <div class="form-group">
          <label for="tipo">Tipo:</label>
          <select v-model="tipoSelecionado">
            <option v-for="tipo in listaTipos" :value="tipo.id">{{ tipo.nome }}</option>
          </select>
        </div>

        <!-- Lembrar de enviar o cidadão logado também -->

        <button class="btn-submit">Enviar Denúncia</button>
      </form>
    </div>

    <div class="lista-denuncias">

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
      titulo: '',
      texto: '',
      urgencia: '',
      orgaoSelecionado: '',
      data: '',
      tipo: '',
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
    //buscar Denuncias desse cidadão logado
    this.buscaOrgaos();
    this.buscaTipos();
  },
  methods: {
    buscaOrgaos() {
      let token = localStorage.getItem('token');
      axios
        .get(`${this.urlBase}/get-all-orgaos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(resposta => {
          this.listaOrgaos = resposta.data;
        })
        .catch(erro => {
          this.listaOrgaos = [];
          console.log(erro);
        });
    },
    buscaTipos() {
      let token = localStorage.getItem('token');
      axios
        .get(`${this.urlBase}/get-all-tipos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(resposta => {
          this.listaTipos = resposta.data;
        })
        .catch(erro => {
          this.listaTipos = [];
          console.log(erro);
        });
    },
    enviarDenuncia() {
      // Implemente a lógica de envio da denúncia aqui
      axios.post('')
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);

  margin: 30px 30px 30px 30px;
}

.form-denuncia {
  margin-bottom: 20px;
}

.opcoes {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

.input-wrapper {
  display: flex;
}

.half-width {
  width: 50%;
  margin-right: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.btn-submit {
  width: 20%;
  background-color: #0036e9;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #426eff;
}




.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group select {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.texto {
  height: 100px;
  width: 80%;
}

.lista-denuncias {}
</style>
