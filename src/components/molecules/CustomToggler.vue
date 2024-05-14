<script setup lang="ts">
import type { Network } from '@/stores/chart';
const emit = defineEmits(['handleChange']);
type StringOrNumber = string | number | Network;
defineProps<{
  itemOptions: StringOrNumber[];
  selectedItem: StringOrNumber;
}>();
function handleValueChange(val: StringOrNumber) {
  emit('handleChange', val);
}
</script>
<template>
  <ul class="flex m-2">
    <li
      class="p-1 m-1 border-2 rounded-md cursor-pointer"
      v-for="item in itemOptions"
      :key="item"
      @:click="handleValueChange(item)"
      :class="{ 'bg-blue-200': selectedItem.toString() === item.toString() }"
    >
      {{ item }}
    </li>
  </ul>
</template>
<style scoped></style>
