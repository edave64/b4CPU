<template>
  <h4>Welcome to the b4CPU tutorial.</h4>
  <p>
    B4CPU is a simulator for a simple 4-bit CPU. It is build to allow you to
    understand how a CPU works, without getting into overwhelming details.
  </p>
  <p>
    Before you start, make sure you have a basic understanding of
    <a href="https://en.wikipedia.org/wiki/Binary_number">binary numbers</a>.
    It's important to be able to follow the data flowing through the CPU. But
    don't worry, you only need to count up to 15.
  </p>
  <p style="border: 1px solid var(--q-warning)" class="rounded-borders q-pa-xs">
    <strong>Warning!</strong> This simulation made to be very simple and not to
    be accurate to real CPU architectures. E.g. it does not follow the von
    Neumann architecture that most modern CPUs use and instead seperates
    instruction memory and data memory.
  </p>
  <q-btn
    stretch
    flat
    color="primary"
    label="Proceed to tour"
    @click="emit('advance')"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(['advance']);
</script>
