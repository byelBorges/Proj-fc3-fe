<template>
  <h1>{{ msg }}</h1>

  <div class="login">
    <div class="divImagem">
      <img src="../assets/alto_falante.png" alt="imagem_alto_falante">
      <p>Ativo e Operante!</p>
    </div>

    <form @submit.prevent="logar()">
      <label for="email">Login</label>
      <input type="text" id="email" v-model="email" placeholder="Informe seu email">

      <label for="senha">Senha</label>
      <input type="password" id="senha" v-model="senha" placeholder="Informe a senha">

      <input class="bttEnviar" type="submit" value="Enviar">
    </form>

    <div class="divCadastrar">
      <a @click="this.redirecionaTelaCadastro()">Cadastre-se aqui</a>
    </div>

  </div>
  <message-box :mensagem="mensagemErro" v-if="exibirMessageBox"></message-box>
</template>

<script>
import axios from "axios"
import MessageBox from './MessageBox.vue'

export default {
  components: {
    MessageBox
  },
  name: 'FormLogin',
  props: {
    msg: String
  },
  data() {
    return {
      email: '', senha: '',
      exibirMessageBox: false,
      mensagemErro: '',
    }
  },
  methods: {
    logar() {
      const URL = "http://localhost:8080/apis/logar";
      const user = { email: this.email, senha: this.senha, nivel: 2 };
      // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.post(URL, user)
        .then(response => {
          const token = response.data;
          localStorage.setItem("token", token);
          console.log(token);
          console.log(this.getNivelAcesso(token));
          if (this.getNivelAcesso(token) == "1") { //administrador
            window.location.href = "/adm";
          }
          else {
            //cidadao
            window.location.href = "/cidadao";
          }
        })
        .catch(error => {
          this.mensagemErro = error;
          this.exibirMessageBox = true;
        });
    },
    getNivelAcesso(token) {
      const base64Url = token.split('.')[1];
      if (base64Url) {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        return payload.nivel;
      }
      else {
        throw new Error(`Você ainda não possui um login cadastrado no sistema Ativo e Operante!
        Por favor, registre-se para acessar o sistema.`);
      }
    },
    redirecionaTelaCadastro(){
      window.location.href= "/cadastro";
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.divCadastrar{
  float: right;
}

.divCadastrar a {
  color: #0036e9; /* Cor do texto */
  text-decoration: none; /* Remover sublinhado padrão */
  font-weight: bold; /* Deixar o texto em negrito */
  transition: color 0.3s ease; /* Adicionar uma transição suave para a mudança de cor */
}

.divCadastrar a:hover {
  color: #426eff; /* Cor do texto ao passar o mouse */
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

input[type=submit]:hover {
  background-color: #426eff;
}

.divImagem {
  padding-bottom: 35px;
}




.login {
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
}
</style>
