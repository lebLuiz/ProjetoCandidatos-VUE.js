<template>
  <div>

    <h2>Pretensão salarial(R$) dos candidatos</h2>

    <div class="small" v-if="!naoMontarGraficos">
      <div style="margin-left: 150px;">
        <line-chart :chart-data="datacollection"></line-chart>
      </div>

      <hr>

      <div style="margin-right: 150px;">
        <pie-chart :chartData="datacollection" />
      </div>
    </div>
    <h4 v-else>Não há candidatos no momento</h4>
    
    
  </div>
</template>

<script>
import LineChart from "./js/LineChart.js";
import PieChart from "./js/PieChart";

export default {
  components: {
    LineChart,
    PieChart,
  },
  data() {
    return {
      datacollection: null,
      naoMontarGraficos: true,
    };
  },
  created(){
    if(window.localStorage.getItem('listaCandidatos') != undefined && 
      window.localStorage.getItem('listaCandidatos') != null &&
      window.localStorage.getItem('listaCandidatos') != ''){

      if (JSON.parse(localStorage.getItem('listaCandidatos')).length > 0) {
        this.naoMontarGraficos = false;
        this.fillData();
      }

    }
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.getNomeCandidatos(),
        datasets: [
          {
            label: "Pretensão salarial",
            backgroundColor: this.getCoresAleatorias(),
            fill: false,
            tension: 0.5,
            data: this.getPretensaoSalarialCandidatos(),
            hoverOffset: 4
          },
        ],
      };
    },

    getNomeCandidatos() {
      const candidatos = JSON.parse(localStorage.getItem('listaCandidatos'));

      let listaNomesCandidatos = [];

      candidatos.forEach(c => {
        listaNomesCandidatos.push(c.nomeCandidato);
      });

      return listaNomesCandidatos;
    },

    getPretensaoSalarialCandidatos() {
      const candidatos = JSON.parse(localStorage.getItem('listaCandidatos'));

      let listaPretensaoSalarial = [];

      candidatos.forEach(c => {
        listaPretensaoSalarial.push(c.pretensaoSalarial);
      });
      return listaPretensaoSalarial;
    },

    getCoresAleatorias() {
      const candidatos = JSON.parse(localStorage.getItem('listaCandidatos'));
      let listaCores = [];

      candidatos.forEach(() => {
        const random = () => Math.floor(Math.random() * 256);
        let corGerada = `rgb(${random()},${random()},${random()})`;

        listaCores.push(corGerada);
      });

      return listaCores;
    },
  },
};
</script>

<style>
.small {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}
</style>