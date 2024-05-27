<template>
    <div>
      <p><a href="\login">home</a></p>
      <h1>Módulo do Cidadão</h1>
      <div>
        <h3>Opções para visualizar as denúncias enviadas pelo Cidadão logado</h3>
        <h3>Formulário para enviar uma nova denúncia</h3>
      </div>
    </div>
  </template>
<script>
  export default {
    name: 'FormCidadao'
  ,
  beforeMount() {
    const token=localStorage.getItem("token");
    if(token==null)
        window.location.replace("\login");
  }
}
</script>
<style scoped>
   div{background-color: hotpink;}
</style>