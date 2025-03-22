<script setup lang="ts">
import { useStore } from '@/store/Store';

    const store = useStore();
</script>

<template>
    <div v-if="store.token" class="burger-menu absolute top-5 left-5 md:hidden xs:block z-[99999]">
        <div @click="store.toggler('burger-menu')" :class="`tham tham-e-squeeze xm:tham-w-9 xs:tham-w-7 ${store.toggle && store.type === 'burger-menu' ? 'tham-active' : ''}`">
            <div class="tham-box">
                <div class="tham-inner bg-black !rounded-none"></div>
            </div>
        </div>
    </div>
</template>