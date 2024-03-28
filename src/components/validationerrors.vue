<template>
  <ul class="ml-6 list-disc">
    <li v-for="item in errors" class="invalid-feedback">
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    errors: Array,
  },
};
</script>
<style>
.invalid-feedback {
  @apply text-red-500;
}
</style>
