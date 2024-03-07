<script setup lang="ts">
import { ref } from "vue";

import { ReklassedBoxBasic } from "./../";

const x = ref<"1" | "2" | "2">("1");
const classes = ref<string | null>(null);

const handleClick = () => {
  x.value = "2";
  classes.value = "reactive";
};
</script>

<template>
  <ReklassedBoxBasic data-testid="reactive" :x="x" :class="[`extra`, `classes`, classes]" @click="handleClick"> children </ReklassedBoxBasic>
</template>
