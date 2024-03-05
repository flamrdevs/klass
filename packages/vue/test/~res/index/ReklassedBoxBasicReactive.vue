<script setup lang="ts">
import { ref } from "vue";

import { ReklassedBoxBasic } from "./../";

const as = ref<"a" | "button">("button");
const x = ref<"1" | "2" | "2">("1");
const classes = ref<string | null>(null);

const handleClick = () => {
  as.value = "a";
  x.value = "2";
  classes.value = "reactive";
};
</script>

<template>
  <ReklassedBoxBasic data-testid="reactive" :as="as" :x="x" :class="[`extra`, `classes`, classes]" @click="handleClick"> children </ReklassedBoxBasic>
</template>
