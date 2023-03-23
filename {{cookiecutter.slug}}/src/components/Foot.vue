<template>
  <footer class="p-4 bg-white mt-auto border-top text-center">
    <span>Copyright © {{ '{{' }} year {{ '}}' }}}} Powered by {{cookiecutter.slug}}</span>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
footer {
  border-top: 1px solid var(--bs-border-color);
}
</style>