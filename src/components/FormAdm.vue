<template>
  <div class="container">
    <h1>Módulo do Administrador</h1>
    <div>
      <h3>Opções para gerenciar o sistema</h3>
      <div class="admin-section">
        <h4>Gerenciar Órgãos</h4>
        <form @submit.prevent="salvarOrgao()">
          <div class="form-group">
            <label for="nomeOrgao">Nome do Órgão:</label>
            <input id="nomeOrgao" v-model="orgao.nome" type="text">
          </div>
          <button class="btn-submit">Salvar Órgão</button>
        </form>
        <ul>
          <li v-for="orgao in listaOrgaos" :key="orgao.id">
            {{ orgao.nome }}
            <button @click="editarOrgao(orgao)">Editar</button>
            <button @click="deletarOrgao(orgao.id)">Deletar</button>
          </li>
        </ul>
      </div>
      
      <div class="admin-section">
        <h4>Gerenciar Tipos de Problemas</h4>
        <form @submit.prevent="salvarTipo()">
          <div class="form-group">
            <label for="nomeTipo">Nome do Tipo:</label>
            <input id="nomeTipo" v-model="tipo.nome" type="text">
          </div>
          <button class="btn-submit">Salvar Tipo</button>
        </form>
        <ul>
          <li v-for="tipo in listaTipos" :key="tipo.id">
            {{ tipo.nome }}
            <button @click="editarTipo(tipo)">Editar</button>
            <button @click="deletarTipo(tipo.id)">Deletar</button>
          </li>
        </ul>
      </div>
      
      <div class="admin-section">
        <h4>Gerenciar Denúncias</h4>
        <ul>
          <li v-for="denuncia in listaDenuncias" :key="denuncia.id">
            {{ denuncia.titulo }}
            <button @click="deletarDenuncia(denuncia.id)">Deletar</button>
            <form @submit.prevent="darFeedback(denuncia.id)">
              <input v-model="denuncia.feedback" type="text" placeholder="Feedback">
              <button type="submit">Enviar Feedback</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FormAdm',
  data() {
    return {
      orgao: { id: null, nome: '' },
      tipo: { id: null, nome: '' },
      listaOrgaos: [],
      listaTipos: [],
      listaDenuncias: [],
      urlBase: 'http://localhost:8080/apis/adm'
    };
  },
  mounted() {
    this.buscarOrgaos();
    this.buscarTipos();
    this.buscarDenuncias();
  },
  methods: {
    buscarOrgaos() {
      axios
        .get(`${this.urlBase}/get-all-orgaos`)
        .then(resposta => {
          this.listaOrgaos = resposta.data;
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    buscarTipos() {
      axios
        .get(`${this.urlBase}/get-all-tipos`)
        .then(resposta => {
          this.listaTipos = resposta.data;
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    buscarDenuncias() {
      axios
        .get(`${this.urlBase}/get-all-denuncias`)
        .then(resposta => {
          this.listaDenuncias = resposta.data;
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    salvarOrgao() {
      const metodo = this.orgao.id ? 'put' : 'post';
      const url = this.orgao.id ? `${this.urlBase}/alterar-orgao` : `${this.urlBase}/add-orgao`;
      
      axios[metodo](url, this.orgao)
        .then(() => {
          this.buscarOrgaos();
          this.orgao = { id: null, nome: '' };
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    editarOrgao(orgao) {
      this.orgao = { ...orgao };
    },
    deletarOrgao(id) {
      axios
        .delete(`${this.urlBase}/del-orgao-id/${id}`)
        .then(() => {
          this.buscarOrgaos();
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    salvarTipo() {
      const metodo = this.tipo.id ? 'put' : 'post';
      const url = this.tipo.id ? `${this.urlBase}/alterar-tipo` : `${this.urlBase}/add-tipo`;
      
      axios[metodo](url, this.tipo)
        .then(() => {
          this.buscarTipos();
          this.tipo = { id: null, nome: '' };
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    editarTipo(tipo) {
      this.tipo = { ...tipo };
    },
    deletarTipo(id) {
      axios
        .delete(`${this.urlBase}/del-tipo-id/${id}`)
        .then(() => {
          this.buscarTipos();
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    deletarDenuncia(id) {
      axios
        .delete(`${this.urlBase}/del-denuncia-id/${id}`)
        .then(() => {
          this.buscarDenuncias();
        })
        .catch(erro => {
          console.log(erro);
        });
    },
    darFeedback(id) {
      const denuncia = this.listaDenuncias.find(d => d.id === id);
      const feedback = denuncia.feedback;
      
      axios
        .post(`${this.urlBase}/add-feedback`, { denunciaId: id, feedback })
        .then(() => {
          this.buscarDenuncias();
        })
        .catch(erro => {
          console.log(erro);
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: orange;
  border-radius: 8px;
}

.admin-section {
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.btn-submit {
  background-color: #0036e9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #426eff;
}
</style>
