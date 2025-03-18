<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { Transition } from 'vue';

import { useStore } from '../store/Store';

    const store = useStore();
    const route = useRoute(); // С помощью useRoute получаем пути а с помощью router получаем доступ к router.push для создания своего пути
</script>

<template>
    <aside v-if="store.token && route.path === '/tasks'" class="navigation h-full bg-white">

        <div class="navigation-wrapper p-4 flex h-full items-center md:flex xs:hidden min-w-[320px] max-w-[320px]">
            <ul class="w-full flex flex-col gap-2">
                <li
                class="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                >
                <RouterLink to="/tasks">
                    <button
                    :class="`p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner text-gray-700 transition-all ease-linear ${route.path === '/tasks' ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white' : ''}`">
                    <img width="25" height="25" src="https://img.icons8.com/arcade/64/tasks.png" alt="tasks"/>
                        Задачи
                    </button>
                </RouterLink>

                </li>
                <li
                class="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                >
                <RouterLink @click="store.deleteToken()" to="/login">
                    <button
                    :class="`p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner text-gray-700 transition-all ease-linear`">
                    <img width="25" height="25" src="https://img.icons8.com/matisse/100/exit.png" alt="exit"/>
                        Выйти
                    </button>
                </RouterLink>
                </li>
            </ul>
        </div>

        <Transition name="slide">
            <div v-if="store.toggle && store.type === 'burger-menu'" class="bg-stone-200 navigation-wrapper p-4 flex h-full items-center md:hidden xs:flex absolute xm:max-w-[320px] xs:w-full">
                <ul class="w-full flex flex-col gap-2">
                    <li
                    class="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                    >
                    <RouterLink to="/tasks">
                        <button
                        @click="store.toggler('close-menu')"
                        :class="`p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner text-gray-700 transition-all ease-linear ${route.path === '/tasks' ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white' : ''}`">
                        <img width="25" height="25" src="https://img.icons8.com/arcade/64/tasks.png" alt="tasks"/>
                            Задачи
                        </button>
                    </RouterLink>

                    </li>
                    <li
                    class="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                    >
                    <RouterLink @click="store.deleteToken()" to="/login">
                        <button
                        :class="`p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner text-gray-700 transition-all ease-linear`">
                        <img width="25" height="25" src="https://img.icons8.com/matisse/100/exit.png" alt="exit"/>
                            Выйти
                        </button>
                    </RouterLink>
                    </li>
                </ul>
            </div>
        </Transition>
    </aside>
</template>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>