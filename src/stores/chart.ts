import { defineStore } from 'pinia';
import { fetchGasPrices } from '@/api/chart';
import { dateMinusDays } from './helpers';

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
  date: Date;
  lowPrice: number;
  avgPrice: number;
  highPrice: number;
}

export const useGasChartStore = defineStore('chartStore', () => {
  let allData: GasPrice[] = [];

  function filterData(selectedNetwork: string, selectedTimeFrame: number) {
    const groupedData: Serie[] = [];
    const filteredData = allData.filter(
      (x: GasPrice) =>
        x.Product.startsWith(selectedNetwork) &&
        (selectedTimeFrame === 0 || dateMinusDays(selectedTimeFrame) < new Date(x.date))
    );

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
    console.log('filtered', groupedData);

    return groupedData;
  }

  async function fetchData() {
    allData = await fetchGasPrices();
    return filterData(Network.Etherium, 0);
  }

  return {
    fetchData,
    filterData
  };
});
