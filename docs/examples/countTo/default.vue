<template>
  <span>{{ countToValueLabel }}</span>
  <br /><br />
  <button type="button" @click="add">+</button>
  &nbsp;
  <button type="button" @click="min">-</button>
  &nbsp; 缓动动画：
  <select v-model="easeFuncName">
    <template v-for="item in easeFuncList" :key="item">
      <option :value="item.name">{{ item.name }}</option>
    </template>
  </select>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useCountTo } from "@blink-elements/hooks";
import * as easeFuncList from "@blink-elements/utils/easing";

// 默认缓动动画
const easeFuncName = ref("easeIn");

const value = ref(0);
const { label: countToValueLabel, updateEaseFunc } = useCountTo(value, {
  easeFunc: easeFuncList[easeFuncName.value],
});

const add = () => {
  value.value += parseInt(String(1000 * Math.random()));
};
const min = () => {
  value.value -= parseInt(String(1000 * Math.random()));
};

watch(easeFuncName, () => {
  updateEaseFunc(easeFuncList[easeFuncName.value]);
});
</script>
