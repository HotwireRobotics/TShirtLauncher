<template>
    <div>
        <apexchart type=radialBar height=350 :options="chartOptions" :series="series" />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
// import Vue from 'vue';

let ts2 = 1484418600000;
let dates = [];

function addData() {
    ts2 = ts2 + 1000;
    let val = Math.floor((Math.random() * 5) + 40);
    const spikeChance = Math.random();
    if (spikeChance > .98) {
        val += 30;
    } else if (spikeChance > .1 && dates && dates[dates.length-1] && dates[dates.length-1][1] > 60) {
        val += 30;
    }
    return [ts2, val];

}

for (let i = 0; i < 120; i++) {
    dates.push(addData())
}


export default {
 name: 'LauncherPsi',
      components: {
        apexchart: VueApexCharts,
      },
    data: () => {return {
        series: [67],
        chartOptions: {
            colors: ['#ff3d00'],
            theme:{
                mode: 'dark',
            },
          chart: {
            background: '#303030'
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              dataLabels: {
                name: {
                  fontSize: '16px',
                  color: undefined,
                  offsetY: 120
                },
                value: {
                  offsetY: 76,
                  fontSize: '22px',
                  color: undefined,
                  formatter: function (val) {
                    return val + ' PSI';
                  }
                }
              }
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
            },
          },
          stroke: {
            dashArray: 4
          },
          labels: ['Median Ratio']
        }
      }}
};

</script>