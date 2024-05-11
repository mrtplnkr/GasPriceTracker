import { ref, reactive, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchGasPrices } from '@/api/chart';

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

interface Filters {
  timeFrame: number | undefined;
  gasNetwork: Network;
}

export const useGasChartStore = defineStore('chartStore', () => {
  const timeFrameOptions: number[] = reactive([7, 30, 90]);
  const selectedTimeFrame: Ref<number> = ref(0);
  const networkOptions: string[] = reactive(Object.values(Network));
  const selectedNetwork: Ref<string> = ref(Network.Etherium);

  const filters = ref<Filters>({
    timeFrame: undefined,
    gasNetwork: Network.Etherium
  });

  const toggleNetwork = (selection: Network) => {
    selectedNetwork.value = networkOptions.find((item) => item === selection)!;
  };

  const toggleTimeFrame = (selection: number) => {
    selectedTimeFrame.value = selection;
  };

  async function fetchData() {
    const groupedData: Serie[] = [];
    const data = await fetchGasPrices();
    const distinctProducts = new Set(data.map((x: GasPrice) => x.Product));
    distinctProducts.forEach((product: string) => {
      groupedData.push({
        name: `${product} low`,
        data: data.filter((x: GasPrice) => x.Product === product).map((x: GasPrice) => x.lowPrice)
      });
      groupedData.push({
        name: `${product} avg`,
        data: data.filter((x: GasPrice) => x.Product === product).map((x: GasPrice) => x.avgPrice)
      });
      groupedData.push({
        name: `${product} high`,
        data: data.filter((x: GasPrice) => x.Product === product).map((x: GasPrice) => x.highPrice)
      });
    });
    return groupedData;
  }

  return {
    fetchData,
    filters,
    timeFrameOptions,
    toggleTimeFrame,
    selectedTimeFrame,
    networkOptions,
    toggleNetwork,
    selectedNetwork
    // chartSeries
  };
});
