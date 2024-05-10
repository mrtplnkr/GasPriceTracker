<script async setup lang="ts">
import { Network, useGasChartStore } from '@/stores/chart';
import { storeToRefs } from 'pinia';
import CustomToggler from './CustomToggler.vue';
import ApexChart from 'vue3-apexcharts';

defineProps<{
  msg: string;
}>();

const store = useGasChartStore();

const { toggleNetwork, toggleTimeFrame, networkOptions, timeFrameOptions } = store;

const { selectedNetwork, selectedTimeFrame } = storeToRefs(store);
const now = new Date().getTime();
// console.log('d12', networkOptions, timeFrameOptions, store.toggleNetwork)
function handleNetworkChange(network: Network) {
  toggleNetwork(network);
  console.log('received', network, selectedNetwork.value, store.selectedNetwork);
}
function handleTimeFrameChange(tf: number) {
  toggleTimeFrame(tf);
  console.log('filter by number from current date', new Date(now - tf * 24 * 60 * 60 * 1000));
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
      chart goes here
      <ApexChart
        type="line"
        :options="{
          chart: {
            height: 100
          },
          noData: {
            text: 'No data as expected'
          }
        }"
        :series="[{ data: [] }]"
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
