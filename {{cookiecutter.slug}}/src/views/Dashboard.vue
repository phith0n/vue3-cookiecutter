<template>
  <div class="page layout-fluid theme-light">
    <Sidebar :initial-open="true"></Sidebar>
    <Topbar></Topbar>

    <div class="page-wrapper">
      <div class="p-4">

      </div>
      <Foot></Foot>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import axios from "axios";

onMounted(async () => {
  const response = await axios.get("/api/v1/self")
  console.log(response.data.username);
})
</script>

<style scoped>

</style>