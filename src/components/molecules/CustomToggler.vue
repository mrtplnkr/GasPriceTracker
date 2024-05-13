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
  <ul class="listContainer">
    <li
      v-for="item in itemOptions"
      :key="item"
      @:click="handleValueChange(item)"
      :class="{ active: selectedItem.toString() === item.toString() }"
    >
      {{ item }}
    </li>
  </ul>
</template>
<style scoped>
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
.active {
  background: lightblue;
}
</style>
