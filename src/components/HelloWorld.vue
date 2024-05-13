<script async setup lang="ts">
import CustomToggler from './molecules/CustomToggler.vue';
import HelloChart from './organisms/HelloChart.vue';
import { Network, type Serie } from '@/stores/chart';
import { storeToRefs } from 'pinia';
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
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
    <div class="flex justify-around flex-col sm:flex-row items-end">
      <CustomToggler
        :itemOptions="networkOptions"
        @handleChange="handleNetworkChange"
        :selectedItem="selectedNetwork"
      />
      <CustomToggler
        class="sm:justify-end"
        :itemOptions="timeFrameOptions"
        @handleChange="handleTimeFrameChange"
        :selectedItem="selectedTimeFrame"
      />
    </div>
    <div class="justify-center">
      <HelloChart :dateRange="chartStore.dateRange" :chartSeries="chartSeries" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
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
