<template>
    <div>
        <apexchart type=line width=850 :options="chartOptions" :series="series" />
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
    name: 'PowerChart',
    components: {
        apexchart: VueApexCharts,
    },
    data: () => {
        return {
            series: [{
                name: 'A Volts',
                data: dates
            }],
            chartOptions: {
                chart: {
                    animations: {
                        enabled: false
                    },
                    stacked: false,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: false
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                stroke: {
                    width: 2
                },
                dataLabels: {
                    enabled: false
                },
                theme: {
                    mode: 'dark',
                    palette: 'palette3'
                },
                // colors: ['ff65fc'],
                title: {
                    text: 'Motor Stats',
                    align: 'left'
                },
                yaxis: {
                    type: 'number',
                    title: {
                        text: 'Volts'
                    },
                    min: 0,
                    max: 100
                },
                xaxis: {
                    labels: {
                        formatter: function (val) {
                            const label = `${new Date(val).getMinutes()}:${new Date(val).getSeconds()}`;
                            return label;
                        }
                    },
                    title: {
                        text: 'Minutes:Seconds'
                    }
                }
            }
        }
    },
    mounted: function() {
        setInterval(() => {
            let d = this.series[0].data
            d.shift();
            d.push(addData());
            this.series = [{
                data: d
            }]
            // this.series[0].data = d;
        }, 1000);
    }
};

</script>