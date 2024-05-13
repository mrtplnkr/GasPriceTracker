<script async setup lang="ts">
import type { Serie } from '@/stores/chart';
import ApexChart from 'vue3-apexcharts';

defineProps<{
  chartSeries: Serie[];
  dateRange: string[];
}>();
</script>

<template>
  <ApexChart
    type="line"
    :options="{
      xaxis: {
        categories: dateRange
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
