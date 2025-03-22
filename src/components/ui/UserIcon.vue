<script setup lang="ts">
import { useStore } from '@/store/Store' // Импортурем store
import { storeToRefs } from 'pinia'; // Импортурем стейт
import { ref, watch } from 'vue';

import router from '@/router';

    const store = useStore();
    const {token} = storeToRefs(store)

    const openDropMenu = ref<boolean>(false);

    const dropMenu = () => {
        console.log('click')
        openDropMenu.value = !openDropMenu.value;
    }

    const authAccount = () => {
        if (token.value !== null) {
            store.deleteToken();
            openDropMenu.value = false;
        } else {
            router.push('/login');
            openDropMenu.value = false;
        }
    }

    watch(token, () => {
        if (token.value === null) {
            router.push('/login');
            openDropMenu.value = false;
        }
    })

</script>

<template>
    <div class="auth absolute top-5 right-5 md:block xs:hidden">
        <div class="auth-container flex-col flex items-end">
            
            <button @click="dropMenu" :class="token ? 'input__button__shadow bg-green-400' : 'input__button__shadow bg-red-500'">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
                width="20px"
                height="20px"
                >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                ></path>
                </svg>
            </button>

            <div 
                class="auth-dropdown absolute top-full right-0 w-max bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 scale-95"
                :class="{ 'opacity-100 scale-100': openDropMenu }"
            >
                <ul class="auth-dropdown__ul p-2">
                    <li @click="authAccount" class="auth-dropdown__li px-2 py-1 cursor-pointer text-gray-700 font-medium transition-colors duration-300 hover:bg-gray-100 hover:text-black">
                        {{ token ? 'Выйти из аккаунта' : 'Войти в аккаунт' }}
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>