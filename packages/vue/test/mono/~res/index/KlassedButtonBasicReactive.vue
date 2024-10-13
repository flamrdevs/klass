<script setup lang="ts">
import { ref } from "vue";

import { KlassedButtonBasic } from "./../";

import { DATA_TESTID_REACTIVE_PROPS } from "./../../../../../tests";

const color = ref<"red" | "green" | "blue">("red");
const classes = ref<string | null>(null);

const handleClick = () => {
  color.value = "blue";
  classes.value = "reactive";
};
</script>

<template>
  <KlassedButtonBasic v-bind="DATA_TESTID_REACTIVE_PROPS" :color="color" :class="['extra', 'classes', classes]" @click="handleClick"> children </KlassedButtonBasic>
</template>
