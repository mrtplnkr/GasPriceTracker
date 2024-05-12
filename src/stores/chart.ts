import { defineStore } from 'pinia';
import { fetchGasPrices } from '@/api/chart';
import { dateMinusDays, formatDates } from './helpers';
import { ref, type Ref } from 'vue';

export enum Network {
  Etherium = 'Etherium',
  Binance = 'Binance',
  Chain = 'Chain',
  Polygon = 'Polygon'
}

export interface Serie {
  name: string;
  data: number[];
}

interface GasPrice {
  Product: string;
  date: string;
  lowPrice: number;
  avgPrice: number;
  highPrice: number;
}

export const useGasChartStore = defineStore('chartStore', () => {
  let allData: GasPrice[] = [];
  const dateRange: Ref<string[]> = ref([]);

  function filterData(selectedNetwork: string = Network.Etherium, selectedTimeFrame: number = 90) {
    const groupedData: Serie[] = [];
    const filteredData = allData
      .filter(
        (x: GasPrice) =>
          x.Product.startsWith(selectedNetwork) &&
          (selectedTimeFrame === 0 || dateMinusDays(selectedTimeFrame) < new Date(x.date))
      )
      .sort((a: GasPrice, b: GasPrice) => {
        return new Date(b.date) > new Date(a.date) ? 1 : -1;
      });

    dateRange.value = formatDates(filteredData.map((x) => x.date));

    const distinctProducts = new Set(filteredData.map((x: GasPrice) => x.Product));

    distinctProducts.forEach((product: string) => {
      groupedData.push({
        name: `${product} low`,
        data: filteredData.map((x: GasPrice) => x.lowPrice)
      });
      groupedData.push({
        name: `${product} avg`,
        data: filteredData.map((x: GasPrice) => x.avgPrice)
      });
      groupedData.push({
        name: `${product} high`,
        data: filteredData.map((x: GasPrice) => x.highPrice)
      });
    });

    return groupedData;
  }

  async function fetchData() {
    allData = await fetchGasPrices();
    return filterData();
  }

  return {
    fetchData,
    filterData,
    dateRange
  };
});
