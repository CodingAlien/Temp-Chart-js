

<script>
import Chart from 'chart.js'
import temperatureData from './temperature_data.js'


export default {
    data: function() {
      return {    
      temperatureData: temperatureData,
      dataReady: false,
      tempArray: [],
      }
    },
    methods: {
      createchart(chartID, chartData) {
        const ctx = document.getElementById(chartID);
        const myChart = new Chart(ctx, chartData);
      },
      fetchTemp() { 
        return fetch("/temperature")
          .then((resp)=>resp.json())
          .then((result) => {
            return result;
            
          })
        },
    },

    mounted() {
      const self = this;
      setInterval(() => { 
        console.log(this.tempArray);
        
        this.fetchTemp()
          .then(temp_Data => {
          this.dataReady = true;
          const tempData = temp_Data.map(x => JSON.parse(x))[0];

          //self.tempArray = [...self.tempArray, tempData];    
          console.log(['tempData', tempData]);
          self.tempArray.push(tempData)


          const tempo_data = self.tempArray.map(x => x.temp);
          const time_data = self.tempArray.map(x => x.timestamp);
          this.createchart('temp_chart', temperatureData(tempo_data, time_data));
        }); }, 3000);
          
    }
  }

</script>

<template>
<div id="app" >
  <div>
    <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
      <b-dropdown-item>First Action</b-dropdown-item>
      <b-dropdown-item>Second Action</b-dropdown-item>
      <b-dropdown-item>Third Action</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item active>Active action</b-dropdown-item>
      <b-dropdown-item disabled>Disabled action</b-dropdown-item>
    </b-dropdown>
  </div>
  
  <div v-if="this.dataReady"></div>
    <canvas id="temp_chart"></canvas>
</div>
</template>
