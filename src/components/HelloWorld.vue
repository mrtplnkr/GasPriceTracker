<script async setup lang="ts">
import CustomToggler from './CustomToggler.vue';
import ApexChart from 'vue3-apexcharts';
import { Network, type Serie } from '@/stores/chart';
import { storeToRefs } from 'pinia';
import { getMonths } from '@/stores/helpers';
import { onMounted, ref, type Ref } from 'vue';
import { useGasFilterStore, useGasChartStore } from '@/stores';

defineProps<{
  msg: string;
}>();

const chartStore = useGasChartStore();

const filterStore = useGasFilterStore();

const { fetchData, filterData } = chartStore;

const { toggleNetwork, toggleTimeFrame, networkOptions, timeFrameOptions } = filterStore;

const { selectedNetwork, selectedTimeFrame } = storeToRefs(filterStore);

const chartSeries: Ref<Serie[]> = ref([]);

onMounted(async () => {
  const fData = await fetchData();
  chartSeries.value = fData;
});

function handleNetworkChange(network: Network) {
  toggleNetwork(network);
  chartSeries.value = filterData(selectedNetwork.value, selectedTimeFrame.value);
}
function handleTimeFrameChange(tf: number) {
  toggleTimeFrame(tf);
  chartSeries.value = filterData(selectedNetwork.value, selectedTimeFrame.value);
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

    <div class="spreadContainer">
      <CustomToggler
        :itemOptions="networkOptions"
        @handleChange="handleNetworkChange"
        :selectedItem="selectedNetwork"
      />
      <CustomToggler
        :itemOptions="timeFrameOptions"
        @handleChange="handleTimeFrameChange"
        :selectedItem="selectedTimeFrame"
      />
    </div>
    <div class="centerContainer">
      <ApexChart
        type="line"
        :options="{
          xaxis: {
            categories: getMonths(12)
          },
          tooltip: {
            theme: 'dark'
            // custom() {
            //   return '<div>asd</div>';
            // }
          },
          chart: {
            height: 300
          },
          noData: {
            text: 'No data as expected'
          }
        }"
        :series="chartSeries"
      />
    </div>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
.spreadContainer {
  display: flex;
  justify-content: space-around;
}
.centerContainer {
  text-align: center;
  margin: 10px 0;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
}
.listContainer {
  margin: 5px;
  border: 1px solid blue;
  border-radius: 5px;
  padding: 5px;
  list-style: none;
  display: flex;
}
.listContainer li {
  margin: 2px;
  padding: 2px;
  border: 1px solid green;
  border-radius: 5px;
  cursor: pointer;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
