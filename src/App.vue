<script setup lang="ts"> // Импорты, переменные и функции пишутся тут, и так же экспорт тут автоматический
import { RouterView } from 'vue-router';

import BurgerMenu from './components/ui/BurgerMenu.vue';
import Navigation from './components/Navigation.vue';

import AddTask from './components/modals/addTask.vue';
import ChangeTask from './components/modals/changeTask.vue';
</script>

<template>
  <BurgerMenu/>

  <AddTask/>
  <ChangeTask/>

  <div class="route-wrapper flex justify-center">
    <Navigation/>
    <RouterView/>
  </div>
</template>