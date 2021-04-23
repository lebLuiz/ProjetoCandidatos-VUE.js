<template>
  <div id="app">
    <div id="nav">
      <span>
        <el-button
          type="info"
          v-for="caminho in caminhos" :key="caminho.titulo"
          @click="caminho.rota">{{ caminho.titulo }}</el-button>
      </span>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {

  data() {
    return {
      caminhos: [
        {
          titulo: 'Dashboard',
          rota: () =>  {
            if (this.$route.name != 'Dashboard') {
              this.$router.push({ name: 'Dashboard' })
            }
          },
        },
        {
          titulo: 'Lista',
          rota: () =>  {
            if (this.$route.name != 'Lista') {
              this.$router.push({ name: 'Lista' })
            }
          },
        },
      ]
    }
  }

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
