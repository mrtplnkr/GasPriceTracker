<script async setup lang="ts">
import type { Serie } from '@/stores/chart';
// eslint-disable-next-line
// @ts-ignore
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
