<template>
    <div class="message-box-overlay" v-if="exibir">
      <div class="message-box">
        <span class="close-btn" @click="fecharMessageBox">&times;</span>
        <p>{{ mensagem }}</p>
        <button @click="fecharMessageBox">Fechar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      mensagem: String
    },
    data() {
      return {
        exibir: true
      };
    },
    methods: {
      fecharMessageBox() {
        this.exibir = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .message-box-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .message-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    max-width: 80%;
    text-align: center;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #666;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #0036e9;
    color: #fff;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #426eff;
  }
  </style>