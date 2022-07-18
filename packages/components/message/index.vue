<template>
  <div class="title">{{ title }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("hello message");
</script>

<style scoped>
.title {
  color: red;
}
</style>
