import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

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

export const useGasFilterStore = defineStore('filterStore', () => {
  const timeFrameOptions: number[] = [7, 30, 90];
  const selectedTimeFrame: Ref<number> = ref(90);
  const networkOptions: string[] = Object.values(Network);
  const selectedNetwork: Ref<string> = ref(Network.Etherium);

  const toggleNetwork = (selection: Network) => {
    selectedNetwork.value = networkOptions.find((item) => item === selection)!;
  };

  const toggleTimeFrame = (selection: number) => {
    selectedTimeFrame.value = selection;
  };

  return {
    timeFrameOptions,
    toggleTimeFrame,
    selectedTimeFrame,
    networkOptions,
    toggleNetwork,
    selectedNetwork
  };
});
