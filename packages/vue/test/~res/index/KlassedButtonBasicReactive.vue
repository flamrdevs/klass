<script setup lang="ts">
import { ref } from "vue";

import { KlassedButtonBasic } from "./../";

import { DATA_TESTID_REACTIVE_PROPS } from "./../../../../tests";

const as = ref<"a" | "button">("button");
const color = ref<"red" | "green" | "blue">("red");
const classes = ref<string | null>(null);

const handleClick = () => {
  as.value = "a";
  color.value = "blue";
  classes.value = "reactive";
};
</script>

<template>
  <KlassedButtonBasic v-bind="DATA_TESTID_REACTIVE_PROPS" :as="as" :color="color" :class="['extra', 'classes', classes]" @click="handleClick"> children </KlassedButtonBasic>
</template>
