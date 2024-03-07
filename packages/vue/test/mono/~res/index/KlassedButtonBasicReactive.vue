<script setup lang="ts">
import { ref } from "vue";

import { KlassedButtonBasic } from "./../";

const color = ref<"red" | "green" | "blue">("red");
const classes = ref<string | null>(null);

const handleClick = () => {
  color.value = "blue";
  classes.value = "reactive";
};
</script>

<template>
  <KlassedButtonBasic data-testid="reactive" :color="color" :class="['extra', 'classes', classes]" @click="handleClick"> children </KlassedButtonBasic>
</template>
