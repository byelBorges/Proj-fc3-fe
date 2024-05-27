<template>
    <div class="divCentral">
        <div class="divFormCad">
            <p>Cadastro de Cidadão</p>
            <form @submit.prevent="enviarCadastro()">
                <label for="cpf">CPF</label>
                <input @input="mascaraNumerosCPF()" id="cpf" name="cpf" v-model="cpf" type="text">

                <label for="email">Email</label>
                <input id="email" name="email" v-model="email" type="email">

                <label for="senha">Senha</label>
                <input id="senha" name="senha" v-model="senha" type="password">

                <input class="bttCadastrar" type="submit" value="Confirmar">
            </form>
        </div>

    </div>
    <message-box :mensagem="mensagem" v-if="exibirMessageBox"></message-box>
</template>

<script>
import axios from "axios";
import MessageBox from "./MessageBox.vue";

export default {
    components: {
        MessageBox
    },
    name: 'FormCadastroCidadao',
    data() {
        return {
            cpf: '',
            email: '',
            senha: '',
            nivel: 2,
            exibirMessageBox: false, mensagem: '',
        }
    },
    methods: {
        enviarCadastro() {
            const urlCadastroCidadao = "http://localhost:8080/apis/cadastro-cidadao";
            const novoCidadao = { cpf: this.cpf, email: this.email, senha: this.senha, nivel: 2 };
            console.log(novoCidadao);
            axios.post(urlCadastroCidadao, novoCidadao)
                .then(resposta => {
                    console.log("Entrei then");
                    this.mensagem = `Cadastro concluído! Você será redirecionado para a tela de login.`;
                    this.exibirMessageBox = true;
                })
                .catch(error => {
                    console.log("Entrei catch: " + error);
                    this.mensagem = error;
                    this.exibirMessageBox = true;
                })
        },
        mascaraNumerosCPF() {
            this.cpf = this.cpf.replace(/\D/g, '');

            // Garante que o CPF tenha no máximo 11 dígitos
            if (this.cpf.length > 11) {
                this.cpf = this.cpf.slice(0, 11);
            }
        }
    }
}

</script>

<style scoped>
.divCentral {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.divFormCad {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
}

.divFormCad p {
    font-size: 24px;
    margin-bottom: 20px;
}

.divFormCad form {
    margin-bottom: 0;
}

.divFormCad label {
    display: block;
    margin-bottom: 10px;
}

.divFormCad input[type="text"],
.divFormCad input[type="email"],
.divFormCad input[type="password"] {
    width: calc(100% - 40px);
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.divFormCad input[type="submit"] {
    width: calc(100% - 40px);
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    background-color: #0036e9;
    color: white;
    cursor: pointer;
}

.divFormCad input[type="submit"]:hover {
    background-color: #426eff;
}
</style>