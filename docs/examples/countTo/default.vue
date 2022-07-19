<template>
  <span>{{ countToValueLabel }}</span>
  <br /><br />
  <button type="button" @click="add">+</button>
  &nbsp;
  <button type="button" @click="min">-</button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useCountTo } from "@blink-elements/hooks";

const value = ref(0);
const { label: countToValueLabel } = useCountTo(value);

const add = () => {
  value.value += parseInt(String(1000 * Math.random()));
};
const min = () => {
  value.value -= parseInt(String(1000 * Math.random()));
};
</script>
