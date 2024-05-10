import { ref, computed, reactive, type Ref } from 'vue';
import { defineStore } from 'pinia';

export enum Network {
  Ethereum = 'Ethereum',
  Binance = 'Binance',
  Chain = 'Chain',
  Polygon = 'Polygon'
}

interface GasPrice {
  Product: string;
  date: Date;
  lowPrice: number;
  avgPrice: number;
}

interface Filters {
  timeFrame: number | undefined;
  gasNetwork: Network;
}

export const useGasChartStore = defineStore('chartStore', () => {
  const timeFrameOptions: number[] = reactive([7, 30, 90]);
  const selectedTimeFrame: Ref<number> = ref(0);
  const networkOptions: string[] = reactive(Object.values(Network));
  const selectedNetwork: Ref<string> = ref(Network.Ethereum);

  const gasPrices: GasPrice[] = [];
  const filters = ref<Filters>({
    timeFrame: undefined,
    gasNetwork: Network.Ethereum
  });
  const filteredGasPrices = computed(() =>
    gasPrices
      .filter(
        (x: any) =>
          filters.value.gasNetwork === x.gasNetwork &&
          (!filters.value.timeFrame || x.date >= new Date().getDate() - filters.value.timeFrame)
      )
      .sort((a: GasPrice, b: GasPrice) => b.date.getDate() - a.date.getDate())
  );

  const toggleNetwork = (selection: Network) => {
    selectedNetwork.value = networkOptions.find((item) => item === selection)!;
  };

  const toggleTimeFrame = (selection: number) => {
    selectedTimeFrame.value = selection;
  };

  return {
    filters,
    filteredGasPrices,
    timeFrameOptions,
    toggleTimeFrame,
    selectedTimeFrame,
    networkOptions,
    toggleNetwork,
    selectedNetwork
  };
});

export async function fetchGasPrices() {
  try {
    const response = await fetch('/priceData.json');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
