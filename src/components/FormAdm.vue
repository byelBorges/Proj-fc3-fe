<template>
  <div class="container">
    <h1>Módulo do Administrador</h1>
    <div>
      <h3>Opções para gerenciar o sistema</h3>
      <div class="admin-section">
        <h4 class="labe">Gerenciar Órgãos</h4>
        <form @submit.prevent="salvarOrgao()">
          <div class="form-group labe">
            <div class="labeb">
              <label for="nomeOrgao">Nome do Órgão:</label>
              <input id="nomeOrgao" v-model="orgao.nome" type="text">
            </div>
            <p></p>
            <button class="btn-submit">Salvar Órgão</button>
          </div>
        </form>
        <ul>
          <li v-for="orgao in listaOrgaos" :key="orgao.id" class="labe">
            {{ orgao.nome }}
            <button @click="editarOrgao(orgao)" class="btn-alter">Editar</button>&nbsp;
            <button @click="deletarOrgao(orgao.id)" class="btn-delete">Deletar</button>
          </li>
        </ul>
      </div>
      
      <div class="admin-section">
        <h4 class="labe">Gerenciar Tipos de Problemas</h4>
        <form @submit.prevent="salvarTipo()">
          <div class="form-group labe">
            <div class="labeb">
              <label for="nomeTipo">Nome do Tipo:</label>
              <input id="nomeTipo" v-model="tipo.nome" type="text">
            </div>
            <p></p>
            <button class="btn-submit">Salvar Tipo</button>
          </div>
        </form>
        <ul>
          <li v-for="tipo in listaTipos" :key="tipo.id" class="labe">
            {{ tipo.nome }}
            <button @click="editarTipo(tipo)" class="btn-alter">Editar</button>&nbsp;
            <button @click="deletarTipo(tipo.id)" class="btn-delete">Deletar</button>
          </li>
        </ul>
      </div>
      
      <div class="admin-section">
        <h4 class="labe">Gerenciar Denúncias</h4>
        <ul>
          <li v-for="denuncia in listaDenuncias" :key="denuncia.id" class="labe">
            {{ denuncia.titulo }}
            <button @click="deletarDenuncia(denuncia.id)" class="btn-delete">Deletar</button>
            <form @submit.prevent="darFeedback(denuncia.id)">
              <input v-model="denuncia.feedback" type="text" placeholder="Feedback">&nbsp;
              <button class="btn-submit">Enviar Feedback</button>
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
      const feedbackdata={
        id: null,
        texto: denuncia.feedback,
        denuncia: denuncia.id
      };
      axios
        .post(`${this.urlBase}/add-feedback`, feedbackdata)
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
  background-color: #0036e9;
  color:black;
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

.btn-delete {
  background-color: #830303;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-alter {
  background-color: #f87603;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.labe {
  background-color: white;
  color: rgb(0, 0, 0);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.labeb {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

input[type=submit] {
  width: 100%;
  background-color: #0036e9;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input,
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 25px;
}

input[type=submit]:hover {
  background-color: #426eff;
}
</style>
