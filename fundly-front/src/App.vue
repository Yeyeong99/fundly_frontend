<template>
  <div
    class="login"
    :class="{
      'total-container': route.name != 'login'
    }"
  >
    <Sidebar v-if="route.name != 'signup' && route.name != 'login'" />
    <IntroductionBar v-else-if="route.name != 'signup'" />
    <main><RouterView /></main>
  </div>
</template>

<script setup>
import Sidebar from "@/components/bar/Sidebar.vue";
import IntroductionBar from "@/components/bar/IntroductionBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped>


.login {
  width: 100%;
  height: 100%;
  display: flex;
}

.total-container {
  width: 95%;
  height: 95%;
  display: flex;
  border: 0.3px solid var(--p-gray-300);
  border-radius: 30px;
}

main {
  height: 100%;
  width: 100%;
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3rem 0 3rem;
}

@media (max-width: 768px) {
  .total-container {
    width: 100%;
    height: 100%;
    border: none;
  }

  main {
    margin: 3rem 0 0 0;
  }
}
</style>
